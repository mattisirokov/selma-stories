// function to format date to dd.mm.yyyy

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("fi-FI");
};
