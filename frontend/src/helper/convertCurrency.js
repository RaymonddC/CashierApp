export const convertIdr = (nominal) => {
  console.log(nominal);
  return nominal.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};
