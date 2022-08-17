import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

import {
  getUserFirstName, getUserLastName,
  getUserSettings,
} from '../../redux/slices/userSlice/user.selectors';
import { setUserSettings } from '../../redux/slices/userSlice/user.slice';

import PageContainer from '../../components/PageContainer';

const initialFormState = {
  theme: '',
  tempMetric: '',
  speedMetric: ''
};

const Settings = () => {
  const dispatch = useDispatch();
  const firstName = useSelector(getUserFirstName);
  const lastName = useSelector(getUserLastName);
  const userSettings = useSelector(getUserSettings);
  const [settings, setSettings] = useState({
    ...initialFormState,
    firstName: firstName ?? '',
    lastName: lastName ?? ''
  });

  useEffect(() => {
    if (userSettings) {
      setSettings(userSettings);
    }
  }, [userSettings]);

  const onChangeFirstName = useCallback((event) => {
    setSettings({
      ...settings,
      firstName: event.target.value
    });
  }, [settings]);

  const onChangeLastName = useCallback((event) => {
    setSettings({
      ...settings,
      lastName: event.target.value
    });
  }, [settings]);

  const onChangeTheme = useCallback((event) => {
    setSettings({
      ...settings,
      theme: event.target.value
    });
  }, [settings]);

  const onChangeTempMetric = useCallback((event) => {
    setSettings({
      ...settings,
      tempMetric: event.target.value
    });
  }, [settings]);

  const onChangeSpeedMetric = useCallback((event) => {
    setSettings({
      ...settings,
      speedMetric: event.target.value
    });
  }, [settings]);

  const onClickSaveSettings = useCallback(() => {
    dispatch(setUserSettings(settings));
  }, [settings, dispatch]);

  return (
    <PageContainer>
      <section className="container">
        <Grid container p={2} justifyContent="center">
          <Grid item xs={4}>
            <Paper elevation={3} sx={{padding: 2}}>
              <Typography variant="h6" pb={1}>First Name</Typography>
              <TextField
                value={settings.firstName}
                variant="outlined"
                onChange={onChangeFirstName}
                fullWidth
              />

              <Typography variant="h6" pb={1}>Last Name</Typography>
              <TextField
                value={settings.lastName}
                variant="outlined"
                onChange={onChangeLastName}
                fullWidth
              />

              <Typography variant="h6" pb={1}>Theme</Typography>
              <Select
                value={settings.theme}
                onChange={onChangeTheme}
                sx={{marginBottom: 3}}
                fullWidth
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>

              <Typography variant="h6" pb={1}>Temperature metric</Typography>
              <Select
                value={settings.tempMetric}
                onChange={onChangeTempMetric}
                sx={{marginBottom: 3}}
                fullWidth
              >
                <MenuItem value="c">C</MenuItem>
                <MenuItem value="f">F</MenuItem>
              </Select>

              <Typography variant="h6" pb={1}>Speed metric</Typography>
              <Select
                value={settings.speedMetric}
                onChange={onChangeSpeedMetric}
                sx={{marginBottom: 3}}
                fullWidth
              >
                <MenuItem value="kph">km/h</MenuItem>
                <MenuItem value="mph">m/h</MenuItem>
              </Select>

              <Button
                onClick={onClickSaveSettings}
                variant="outlined"
                fullWidth
              >
                Save changes
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </section>
    </PageContainer>
  );
};

export default Settings;
