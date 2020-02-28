export const truncateString = (str, limit) => {
  if (str.length <= limit) {
    return str;
  } else {
    return `${str.substring(0, limit - 3)}...`;
  }
};
