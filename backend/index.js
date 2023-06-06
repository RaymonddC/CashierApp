const express = require('express');
const cors = require('cors');

const PORT = 5000;
const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(cors());

const { productRouter, usersRoute } = require('./routers');

app.use('/products', productRouter);
app.use('/users', usersRoute);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
