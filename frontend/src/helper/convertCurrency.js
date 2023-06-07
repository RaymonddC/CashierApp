export const convertIdr = (nominal) => {
  return nominal.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};
