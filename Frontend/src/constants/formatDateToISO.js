export const formatDateToISO = (value) => {
  if (!value) return "";
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (regex.test(value)) {
    const [day, month, year] = value.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return value;
};

export const formatISOToDate = (value) => {
  if (!value) return "";

  try {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch {
    return value; // Trả về nguyên bản nếu không thể phân tích
  }
};
