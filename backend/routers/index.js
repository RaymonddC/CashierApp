const productRouter = require('./productRouter');
const orderMenuRoute = require('./orderMenuRoute');
const transactionRoute = require('./transactionRoute');

const usersRoute = require('./usersRoute');
const authRoute = require('./authRoute');
const categoriesRoute = require('./categoriesRoute');

module.exports = {
  productRouter,
  usersRoute,
  authRoute,
  categoriesRoute,
  orderMenuRoute,
  transactionRoute,
};
