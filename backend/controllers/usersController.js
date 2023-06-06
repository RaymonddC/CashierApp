const { User } = require('./../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Handlebars = require('handlebars');
const fs = require('fs');

// const User = db.user;

const sequelize = require('sequelize');

const generateToken = async (result) => {
  let payload = {
    id: result?.id,
    isAdmin: result?.isAdmin,
  };

  return jwt.sign(payload, 'coding-is-easy', {
    expiresIn: '1h',
  });
};

const avoidPassword = (result) => {
  const { password, createdAt, updatedAt, ...showResult } = result.dataValues;
  return showResult;
};

// const generateTable = async (req, res) => {
//   User.sync({ alter: true });
//   res.send();
// };

const getUser = async (email = '', username = '') => {
  return await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  });
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) throw { message: 'user not found!', code: 400 };

    return res.status(200).send({
      success: true,
      message: 'get user success',
      data: avoidPassword(user),
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const userCreate = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword) throw { message: 'Fill all data', code: 400 };

    if (password.length < 8) throw { message: 'Pasword must be more than 8 characters', code: 400 };

    if (password != confirmPassword) throw { message: 'Pasword salah blok', code: 400 };

    const isEmailExist = await getUser(email, username);

    if (isEmailExist) throw { message: 'username or email is already exists', code: 400 };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(role);
    let newUser = await User.create({
      username,
      email,
      password: hashPassword,
      role_id: role ? role : 2,
    });

    newUser = avoidPassword(newUser);
    return res.status(201).send({
      success: true,
      message: 'Register Success!',
      data: newUser,
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) throw { message: 'Fill all data', code: 400 };

    let result = await getUser(usernameOrEmail, usernameOrEmail);

    if (!result) throw { message: 'account not found', code: 400 };
    console.log(usernameOrEmail, password, result);

    const isUserExists = await bcrypt.compare(password, result.password);

    if (!isUserExists) {
      //   const updateSuspend = await User.increment({ suspendCounter: 1 }, { where: { [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }] } });

      //   console.log(updateSuspend[0][1], 'hello');

      //   result = await getUser(usernameOrEmail, usernameOrEmail);

      throw { message: 'account not found', code: 400 };
    } else {
      const token = await generateToken(result);

      //   const updateSuspend = await User.update({ suspendCounter: 0 }, { where: { [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }] } });

      //   result = await getUser(usernameOrEmail, usernameOrEmail);

      const { password, createdAt, updatedAt, ...showResult } = result.dataValues;

      return res.status(200).send({
        success: true,
        message: 'user login success',
        data: showResult,
        token: token,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await User.findAll({
      include: [Post],
    });

    if (result)
      res.status(200).send({
        success: true,
        message: 'getAllUser Success',
        data: result,
      });
    else
      res.status(400).send({
        success: true,
        message: 'getAllUser failed',
        data: null,
      });
  } catch (error) {
    res.status(500).send({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { firstName, lastName, username, email, birthdate, biography, phoneNumber } = req.body;

    let result = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!result)
      return res.status(400).send({
        success: false,
        message: 'account not found',
        data: null,
      });

    const emailValid = await User.findOne({
      where: {
        email: email ? email : '',
      },
    });

    if (emailValid)
      return res.status(400).send({
        success: false,
        message: 'email already registered',
        data: null,
      });

    const usernameValid = await User.findOne({
      where: {
        username: username ? username : '',
      },
    });

    if (usernameValid)
      return res.status(400).send({
        success: false,
        message: 'username already used',
        data: null,
      });

    const user = result.dataValues;

    const resultUpdate = await User.update(
      {
        firstName: firstName ? firstName : user.firstName,
        lastName: lastName ? lastName : user.lastName,
        birthdate: birthdate ? birthdate : user.birthdate,
        phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber,
        biography: biography ? biography : user.biography,
        username: username ? username : user.username,
        password: user.password,
        activationCode: user.activationCode,
        isAdmin: user.isAdmin,
        suspendCounter: user.suspendCounter,
      },
      {
        where: {
          id: id,
        },
      }
    );

    result = await User.findOne({
      where: {
        id: id,
      },
    });

    let payload = {
      id: req.user.id,
      isAdmin: req.user.isAdmin,
    };

    const token = generateToken(req.user);

    const { password, createdAt, updatedAt, ...showResult } = result.dataValues;

    return res.status(200).send({
      success: true,
      message: 'Update User success',
      data: showResult,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const { token } = req.

    let result = await User.findOne({
      where: {
        id: id,
      },
    });

    const deleteUser = await User.destroy({
      where: {
        id: id,
      },
    });

    if (!deleteUser)
      return res.status(400).send({
        success: false,
        message: 'account not found',
        data: null,
      });

    const token = generateToken(result);

    const { password, createdAt, updatedAt, ...showResult } = result.dataValues;

    return res.status(200).send({
      success: true,
      message: 'delete user success',
      data: showResult,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

const activateUser = async (req, res) => {
  try {
    const { activationCode, email } = req.body;
    // const userId = req.user.id;

    let result = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log('masuk beken', result, activationCode, email);

    if (
      result.dataValues.activationCode !== activationCode
      // || Date.parse(result.dataValues.updatedAt).hou
    ) {
      console.log(result.dataValues.activationCode, activationCode);
      return res.status(400).send({
        success: true,
        message: 'activationCode invalid',
        data: null,
      });
    }

    // console.log('awdawdd');
    const resultUpdate = await User.update(
      {
        activationCode: 0,
      },
      {
        where: {
          email: email,
        },
      }
    );

    result = await User.findOne({
      where: {
        email: email,
      },
    });

    token = await generateToken(result);
    result = avoidPassword(result);

    return res.status(200).send({
      success: true,
      message: 'User Activated',
      data: result,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const isEmailExist = await getUser(email);

    if (!isEmailExist) {
      return res.status(400).send({
        success: false,
        message: 'username or email not found',
      });
    } else {
      const data = fs.readFileSync('./email/emailForgetPassword.html', 'utf-8');

      const tempCompile = await Handlebars.compile(data);
      const tempResult = tempCompile({
        email: email,
        link: `http://localhost:3000/changePassword?email=${email}`,
      });

      await transporter.sendMail({
        sender: 'sosmed',
        to: 'raymondchrisandy@gmail.com',
        subject: 'Forget Password',
        html: tempResult,
      });

      // newUser = avoidPassword(newUser);
      console.log('forget');
      return res.status(201).send({
        success: true,
        message: 'Email Send',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const isEmailExist = await getUser(email);

    if (!isEmailExist) {
      return res.status(400).send({
        success: false,
        message: 'username or email not found',
      });
    }

    if (password.length < 8)
      return res.status(400).send({
        success: false,
        message: 'Pasword must be more than 8 characters',
        data: null,
      });

    if (password != confirmPassword) {
      return res.status(400).send({
        success: false,
        message: 'Pasword salah blok',
        data: null,
      });
    }

    const user = isEmailExist.dataValues;

    console.log(user);

    const resultUpdate = await User.update(
      {
        firstName: firstName ? firstName : user?.firstName,
        lastName: lastName ? lastName : user?.lastName,
        birthdate: birthdate ? birthdate : user?.birthdate,
        phoneNumber: phoneNumber ? phoneNumber : user?.phoneNumber,
        biography: biography ? biography : user?.biography,
        username: username ? username : user.username,
        password: password,
        activationCode: user.activationCode,
        isAdmin: user.isAdmin,
        suspendCounter: 0,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    result = await User.findOne({
      where: {
        id: user.id,
      },
    });

    result = avoidPassword(result);

    return res.status(200).send({
      success: true,
      message: 'Password Changed',
      data: result,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  //   generateTable,
  userCreate,
  //   getAllUser,
  userLogin,
  //   updateUser,
  //   deleteUser,
  //   activateUser,
  getUserById,
  //   forgetPassword,
  //   changePassword,
};
