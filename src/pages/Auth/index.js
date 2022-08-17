import { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  ButtonGroup,
  Typography,
  Grid,
  Paper,
  Box,
  MobileStepper
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

import useUsersObject from '../../hooks/useUsersObject';
import PageContainer from '../../components/PageContainer';

import {
  addUserToList,
  setCurrentUser,
} from '../../redux/slices/userSlice/user.slice';
import {
  getUser,
  getUserLang,
} from '../../redux/slices/userSlice/user.selectors';

import { snackActions } from '../../utils/notices';
import {
  isError,
  isEqual,
  validateEmail,
} from '../../utils/forms';

import { DEFAULT_USER_SETTINGS } from '../../constants';

import i18l from '../../l18i.json';

const initialFormState = {
  type: "login",
  login: "",
  password: "",
  confirmPassword: "",
  email: ""
}

const errors = {
  password: false,
  email: false,
  login: false,
  confirmPassword: false
}

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const language = useSelector(getUserLang);
  const [isUser, setIsUser] = useState(true);
  const [isUserValidated] = useState(user?.isVerified);
  const [formFields, setFormFields] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(errors);
  const [registrationStep, setRegistrationStep] = useState(isUserValidated && user?.validationKey ? 1 : 0);
  const [verificationKey, setVerificationKey] = useState('');

  const usersObject = useUsersObject();

  const onChangeLogin = useCallback((event) => {
    setFormFields({
      ...formFields,
      login: event.target.value
    });
  }, [formFields]);

  const onChangePassword = useCallback((event) => {
    setFormFields({
      ...formFields,
      password: event.target.value
    });
  }, [formFields]);

  const onChangeConfPassword = useCallback((event) => {
    setFormFields({
      ...formFields,
      confirmPassword: event.target.value
    });
  }, [formFields]);

  const onChangeEmail = useCallback((event) => {
    setFormFields({
      ...formFields,
      email: event.target.value
    });
  }, [formFields]);

  const onClickSelectType = useCallback((type = 'sign in') => {
    if (type === 'sign up') {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, []);

  const onClickValidationBack = useCallback(() => {
    setRegistrationStep(0);
  }, []);

  const onChangeFirstName = useCallback((event) => {
    setFormFields({
      ...formFields,
      firstName: event.target.value
    });
  }, [formFields]);

  const onChangeLastName = useCallback((event) => {
    setFormFields({
      ...formFields,
      lastName: event.target.value
    });
  }, [formFields]);

  const onClickLogin = useCallback(() => {
    const user = Object.values(usersObject).find((user) => user.login === formFields.login);

    const currentErrors = {
      login: !formFields?.login,
      password: formFields.password.length < 7,
      email: false,
      confirmPassword: false
    };

    setFormErrors(currentErrors);

    isError(currentErrors);

    if (
      formFields.login &&
      formFields.password.length >= 7 &&
      user &&
      user.password === formFields.password
    ) {
      dispatch(setCurrentUser(user));
      navigate("/");
    }
  }, [formFields, navigate, usersObject, dispatch]);

  const onClickRegister = useCallback(() => {
    if (user.validationKey !== +verificationKey) {
      snackActions.error('Validation key is incorrect!')
    }

    if (!user.isVerified && user.validationKey === +verificationKey) {
      dispatch(setCurrentUser({
        ...user,
        isVerified: true,
        isLoggedIn: true,
      }));

      dispatch(addUserToList({
        ...user,
        isLoggedIn: true,
        isVerified: true
      }));

      setIsUser(true);

      navigate('/');
    }

  }, [dispatch, user, verificationKey, navigate]);

  const onClickRegistrationNext = useCallback(() => {
    const currentErrors = {
      login: !formFields?.login,
      password: formFields.password.length < 7,
      confirmPassword: !formFields?.confirmPassword || !isEqual(formFields.password, formFields.confirmPassword),
      email: !formFields?.email || !validateEmail(formFields.email)
    };

    setFormErrors(currentErrors);

    const isErrors = isError(currentErrors);

    if (!isErrors) {
      const totalUsers = usersObject ? Object.keys(usersObject).length : 0;
      const lastUserId = totalUsers ? Object.keys(usersObject)[totalUsers - 1] : 0;

      const user = Object.values(usersObject).find((user) => user.login === formFields.login);

      if (user) {
        snackActions.error('The user with the similar Login is already exist');
        return;
      }

      const validationKey = Date.now(); // Dummy key generation

      const userSettings = {
        ...DEFAULT_USER_SETTINGS,
        login: formFields.login,
        password: formFields.password,
        email: formFields.email,
        validationKey: validationKey,
      }

      localStorage.setItem(
        "weatherAppUsersList",
        JSON.stringify(
          {
            ...usersObject,
            [+lastUserId + 1]: {...userSettings}
          })
      );

      localStorage.setItem(
        "weatherAppUser",
        JSON.stringify(userSettings)
      );

      dispatch(setCurrentUser({
        ...userSettings,
        validationKey: validationKey
      }));

      setRegistrationStep(1);
    }
  }, [formFields, dispatch, usersObject]);

  const onChangeVerificationKey = useCallback((event) => {
    setVerificationKey(event.target.value);
  }, []);

  return (
    <PageContainer>
      <section className="container">
        <Box p={2} my={5} textAlign="center">
          <Paper
            elevation={3}
            sx={{
              display: "inline-flex",
              padding: "16px",
              margin: "0 auto",
            }}
          >
            <ButtonGroup aria-label="group">
              <Button
                onClick={() => {onClickSelectType('sign in')}}
                aria-label=""
                disabled={isUser}
              >
                {i18l.pages.Auth.signIn[language]}
              </Button>
              <Button
                disabled={!isUser}
                onClick={() => {onClickSelectType('sign up')}}
              >
                {i18l.pages.Auth.signUp[language]}
              </Button>
            </ButtonGroup>
          </Paper>

        </Box>
        <Paper elevation={3} sx={{
          maxWidth: "400px",
          margin: "0 auto",
          "& .MuiMobileStepper-positionStatic": {
            display: "none"
          }
        }}>
          <Grid container p={2}>
            {isUser ? (
              <>
                <Grid item xs={12} mb={2}>
                  <Typography variant="h6">
                    {i18l.pages.Auth.signIn[language]}
                  </Typography>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <TextField
                    onChange={onChangeLogin}
                    type="text"
                    label="Login"
                    error={formErrors.login}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} mb={2}>
                  <TextField
                    onChange={onChangePassword}
                    type="password"
                    label="Password"
                    error={formErrors.password}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    onClick={onClickLogin}
                  >
                    {i18l.pages.Auth.signIn[language]}
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <MobileStepper
                  variant="text"
                  steps={2}
                  position="static"
                  activeStep={0}
                  backButton={registrationStep === 1 ?
                    (<Button size="small" onClick={onClickValidationBack}>
                      <KeyboardArrowLeft />Back</Button>) : null
                  }
                />
                {registrationStep === 0 ? (
                  <>
                    <Grid item xs={12} mb={2}>
                      <Typography variant="h6">
                        {i18l.pages.Auth.signUp[language]}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <TextField
                        onChange={onChangeLogin}
                        error={formErrors.login}
                        type="text"
                        label="Login"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <TextField
                        onChange={onChangePassword}
                        error={formErrors.password}
                        type="password"
                        label="Password"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <TextField
                        onChange={onChangeConfPassword}
                        error={formErrors.confirmPassword}
                        type="password"
                        label="Confirm password"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <TextField
                        onChange={onChangeEmail}
                        error={formErrors.email}
                        type="email"
                        label="Email"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <TextField
                        onChange={onChangeFirstName}
                        type="text"
                        label="First Name"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <TextField
                        onChange={onChangeLastName}
                        type="text"
                        label="Last Name"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <Button
                        variant="outlined"
                        onClick={onClickRegistrationNext}
                      >
                        {i18l.pages.Auth.next[language]}
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <>
                  <Grid item xs={12}>
                    <Typography variant="h6" pb={2}>
                      {i18l.pages.Auth.enterValidationKey[language]}
                    </Typography>
                    <Typography variant="span" fontSize={13} pb={2}>
                      Hint: in localStorega->weatherAppUser->validationKey
                    </Typography>
                    <TextField
                      onChange={onChangeVerificationKey}
                      type="text"
                      label="Key"
                      fullWidth
                    />
                    <Button
                      variant="outlined"
                      onClick={onClickRegister}
                      sx={{marginTop: 2}}
                    >
                      {i18l.pages.Auth.endRegistration[language]}
                    </Button>
                  </Grid>
                  </>
                )}
              </>
            )}
          </Grid>
        </Paper>
      </section>
    </PageContainer>
  );
}

export default Auth;
