export const validateEmail = (email) => {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return !!email.match(pattern);
};

export const isEqual = (first, second) => {
  return first === second;
};

export const isError = (errorsObj = {}) => {
  for (const error of Object.values(errorsObj)) {
    if (error) {
      return true;
    }
  }

  return false;
};
