// function to format date to dd.mm.yyyy

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("fi-FI");
};

// function to decide to whether to use placeholder or image

export const displayPlaceholderImage = (date_created: Date) => {
  const now = new Date();

  const timeDiff = now.getTime() - date_created.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  return hoursDiff > 2;
};
