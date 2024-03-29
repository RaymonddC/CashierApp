const { User, Role } = require('./../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Handlebars = require('handlebars');
const fs = require('fs');

// const User = db.user;

const getAllCashier = async (req, res) => {
  try {
    let result = await User.findAll({
      where: {
        role_id: 2,
      },
      include: { model: Role, attributes: ['type'] },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });

    if (!result) throw { message: 'getAllCashier failed', code: 400 };

    res.status(200).send({
      success: true,
      message: 'getAllCashier Success',
      data: result,
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, confirmPassword, user_image } = req.body;

    console.log(id, username);
    let result = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!result) throw { message: 'account not found', code: 400 };

    const usernameValid = await User.findOne({
      where: {
        username: username ? username : '',
      },
    });

    if (usernameValid) throw { message: 'username already taken', code: 400 };

    const user = result.dataValues;

    console.log(username);
    const resultUpdate = await User.update(
      {
        username: username ? username : user.username,
        email: email ? email : user.email,
        user_image: user_image ? user_image : user.user_image,
        password: password ? password : user.password,
        role_id: user.role_id,
        status: user.status,
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

    return res.status(200).send({
      success: true,
      message: 'Update User success',
      data: result,
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
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

    console.log(deleteUser);
    if (!deleteUser) throw { message: 'account not found', code: 400 };

    const { password, createdAt, updatedAt, ...showResult } = result.dataValues;

    return res.status(200).send({
      success: true,
      message: 'delete user success',
      data: showResult,
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
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
  updateUser,
  deleteUser,
  //   activateUser,
  getAllCashier,
  //   forgetPassword,
  //   changePassword,
};
