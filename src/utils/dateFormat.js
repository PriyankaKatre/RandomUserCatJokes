export const formateDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formatedDate = date.toLocaleDateString("en-GB", options);
  return formatedDate;
};
