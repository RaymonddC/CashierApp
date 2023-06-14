const { User, Role } = require('./../models');
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
    role_id: result?.role_id,
  };

  return jwt.sign(payload, 'coding-is-easy', {
    expiresIn: '1h',
  });
};

const avoidPassword = (result) => {
  const { password, createdAt, updatedAt, ...showResult } = result;
  return showResult.dataValues;
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
    include: { model: Role, attributes: ['type'] },
  });
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });

    if (!user) throw { message: 'user not found!', code: 400 };

    return res.status(200).send({
      success: true,
      message: 'get user success',
      data: user,
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
    console.log('test');
    const { usernameOrEmail, password } = req.body;
    console.log(usernameOrEmail, password);

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

module.exports = {
  userCreate,
  userLogin,
  getUserById,
};
