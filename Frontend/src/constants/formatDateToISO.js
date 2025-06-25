export const formatDateToISO = (value) => {
  if (!value) return "";
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (regex.test(value)) {
    const [day, month, year] = value.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return value;
};
