const express = require("express");
const cors = require("cors");

const PORT = 5000;
const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(cors());

const {
  productRouter,
  usersRoute,
  authRoute,
  categoriesRoute,
  orderMenuRoute,
  transactionRoute,
} = require("./routers");

app.use("/products", productRouter);
app.use("/categories", categoriesRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/orders", orderMenuRoute);
app.use("/transactions", transactionRoute);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
