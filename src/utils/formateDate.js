export const formateDate = (date, config) => {
  const defualtOption = { day: "numeric", month: "long", year: "numeric" };
  const options = config ? config : defualtOption;

  return new Date(date).toLocaleDateString("en-US", options);
};
