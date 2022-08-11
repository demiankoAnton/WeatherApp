import PageContainer from '../../components/PageContainer';
import { Button, Grid, Paper, Typography, Select, MenuItem } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {getUserSettings} from '../../redux/slices/userSlice/user.selectors';
import {useEffect, useState} from 'react';
import { setUserSettings } from '../../redux/slices/userSlice/user.slice';

const initialFormState = {
  theme: '',
  tempMetric: '',
  speedMetric: '',
};

const Settings = () => {
  const dispatch = useDispatch();
  const userSettings = useSelector(getUserSettings);
  const [settings, setSettings] = useState(initialFormState);

  useEffect(() => {
    if (userSettings) {
      setSettings(userSettings);
    }
  }, [userSettings]);

  const onChangeTheme = (event) => {
    setSettings({
      ...settings,
      theme: event.target.value
    });
  }

  const onChangeTempMetric = (event) => {
    setSettings({
      ...settings,
      tempMetric: event.target.value
    });
  };

  const onChangeSpeedMetric = (event) => {
    setSettings({
      ...settings,
      speedMetric: event.target.value
    });
  };

  const onClickSaveSettings = () => {
    dispatch(setUserSettings(settings));
  };

  return (
    <PageContainer>
      <section className="container">
        <Grid container p={2} justifyContent="center">
          <Grid item xs={4}>
            <Paper elevation={3} sx={{padding: 2}}>
              <Typography variant="h6" pb={1}>Theme</Typography>
              <Select
                value={settings.theme}
                onChange={onChangeTheme}
                sx={{marginBottom: 3}}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>

              <Typography variant="h6" pb={1}>Temperature metric</Typography>
              <Select
                value={settings.tempMetric}
                onChange={onChangeTempMetric}
                sx={{marginBottom: 3}}
              >
                <MenuItem value="c">C</MenuItem>
                <MenuItem value="f">F</MenuItem>
              </Select>

              <Typography variant="h6" pb={1}>Speed metric</Typography>
              <Select
                value={settings.speedMetric}
                onChange={onChangeSpeedMetric}
                sx={{marginBottom: 3}}
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
