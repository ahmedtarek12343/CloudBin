export const formatDate = (dateInput: Date, options = {}) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  return date.toLocaleString("en-US", { ...options });
};
