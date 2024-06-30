export const convertUTC = (utc: string) => {
  const date = new Date(utc);
  return date.toLocaleString();
};
