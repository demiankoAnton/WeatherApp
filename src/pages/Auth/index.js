import {useCallback, useState} from 'react';
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
import useUsersObject from '../../hooks/useUsersObject';
import PageContainer from '../../components/PageContainer';
import { useNavigate } from "react-router-dom";
import {DEFAULT_USER_SETTINGS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  addUserToList,
  setCurrentUser,
} from '../../redux/slices/userSlice/user.slice';
import {getUser} from '../../redux/slices/userSlice/user.selectors';
import {
  isError,
  isEqual,
  validateEmail,
} from '../../utils/forms';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

const initialFormState = {
  type: "login",
  login: "",
  password: "",
  confPassword: "",
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
  const [isUser, setIsUser] = useState(true);
  const [isUserValidated] = useState(user?.isVerified);
  const [formFields, setFormFields] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(errors);
  const [registrationStep, setRegistrationStep] = useState(isUserValidated && user?.validationKey ? 1 : 0);
  const [verificationKey, setVerificationKey] = useState('');

  const usersObject = useUsersObject();

  const onClickLogin = useCallback(() => {
    const user = Object.values(usersObject).find((user) => user.login === formFields.login);

    if (user && user.password === formFields.password) {
      dispatch(setCurrentUser(user));
      navigate("/home");
    }
  }, [formFields, navigate, usersObject, dispatch]);

  const onClickRegister = useCallback(() => {
    if (!user.isVerified && user.validationKey === +verificationKey) {

      dispatch(setCurrentUser({
        ...user,
        isVerified: true
      }));
      dispatch(addUserToList({
        ...user,
        isLoggedIn: true,
        isVerified: true
      }));

      setIsUser(true);
    }

  }, [dispatch, user, verificationKey]);

  const onChangeLogin = (event) => {
    setFormFields({
      ...formFields,
      login: event.target.value
    });
  };

  const onChangePassword = (event) => {
    setFormFields({
      ...formFields,
      password: event.target.value
    });
  };

  const onChangeConfPassword = (event) => {
    setFormFields({
      ...formFields,
      confPassword: event.target.value
    });
  };

  const onChangeEmail = (event) => {
    setFormFields({
      ...formFields,
      email: event.target.value
    });
  };

  const onClickSelectType = useCallback((type = 'sign in') => {
    if (type === 'sign up') {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, []);

  const onClickValidationBack = () => {
    setRegistrationStep(0);
  };

  const onClickRegistrationNext = () => {
    const currentErrors = {
      ...formErrors,
      login: !formFields?.login,
      password: !formFields?.password,
      confirmPassword: !formFields?.confPassword || !isEqual(formFields.password, formFields.confPassword),
      email: !formFields?.email || !validateEmail(formFields.email)
    };

    setFormErrors(currentErrors);

    if (!isError(currentErrors)) {
      const totalUsers = usersObject ? Object.keys(usersObject).length : 0;
      const lastUserId = totalUsers ? Object.keys(usersObject)[totalUsers - 1] : 0;

      const user = Object.values(usersObject).find((user) => user.login === formFields.login);

      if (user) {
        return;
      }

      const verificationKey = Date.now();

      const userSettings = {
        ...DEFAULT_USER_SETTINGS,
        login: formFields.login,
        password: formFields.password,
        email: formFields.email,
        validationKey: verificationKey,
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
        validationKey: verificationKey
      }));

      setRegistrationStep(1);
    }
  };

  const onChangeVerificationKey = useCallback((event) => {
    setVerificationKey(event.target.value);
  }, []);

  return (
    <PageContainer>
      <section className="container">
        <Box my={5} textAlign="center">
          <ButtonGroup aria-label="group">
            <Button
              onClick={() => {onClickSelectType('sign in')}}
              aria-label=""
              disabled={isUser}
            >
              Sign In
            </Button>
            <Button
              disabled={!isUser}
              onClick={() => {onClickSelectType('sign up')}}
            >
              Sign Up
            </Button>
          </ButtonGroup>
        </Box>
        <Paper elevation={3} sx={{
          maxWidth: "400px",
          margin: "0 auto",
          "& .MuiMobileStepper-positionStatic": {
            fontSize: 0
          }
        }}>
          <Grid container p={2}>
            {isUser ? (
              <>
                <Grid item xs={12} mb={2}>
                  <Typography variant="h6">Sign In</Typography>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <TextField onChange={onChangeLogin} type="text" label="Login" fullWidth/>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <TextField onChange={onChangePassword} type="password" label="Password" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    onClick={onClickLogin}
                  >
                    Log in
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
                      <Typography variant="h6">Sign Up</Typography>
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
                      <TextField onChange={onChangePassword} error={formErrors.password} type="password" label="Password" fullWidth/>
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <TextField
                        onChange={onChangeConfPassword}
                        error={formErrors.confirmPassword}
                        type="text"
                        label="Key"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <TextField onChange={onChangeEmail} error={formErrors.email} type="email" label="Email" fullWidth/>
                    </Grid>
                    <Grid item xs={12} mb={2}>
                      <Button
                        variant="outlined"
                        // onClick={onClickRegister}
                        onClick={onClickRegistrationNext}
                      >
                        Next
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <>
                  <Grid item xs={12}>
                    <Typography variant="h6" pb={2}>Please enter validation key</Typography>
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
                      End Registration
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
