export const qtyxprice = (qty, price) => {
  return qty * price;
};

export const subTotal = (array) => {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i]?.quantity * array[i]?.product?.price;
  }
  return result;
};
