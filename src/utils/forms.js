import { snackActions } from './notices';

export const validateEmail = (email) => {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return !!email.match(pattern);
};

export const isEqual = (first, second) => {
  return first === second;
};

export const isError = (errorsObj = {}) => {
  let hasErrors = false;

  for (const error of Object.keys(errorsObj)) {
    if (errorsObj[error]) {
      if (error === 'login') {
        snackActions.error('Login is missing or incorrect');
      }

      if (error === 'password') {
        snackActions.error('Password is missing, to short or incorrect');
      }

      if (error === 'confirmPassword') {
        snackActions.error('Passwords are not equal');
      }

      if (error === 'email') {
        snackActions.error('Email is incorrect');
      }

      hasErrors = true;
    }
  }

  return hasErrors;
};
