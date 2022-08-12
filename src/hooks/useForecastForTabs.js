import { useMemo } from 'react';
import {useSelector} from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

import style from '../components/Forecast/Forecast.module.scss';
import { getUserSettings } from '../redux/slices/userSlice/user.selectors';

const useForecastForTabs = (content) => {
  const settings = useSelector(getUserSettings);

  return useMemo(() => {
    return content && content.forecast.forecastday.map((day) => {
      return {
        label: day.date,
        content: <ForecastTabContent currentDay={day} settings={settings}/>
      }
    });
  }, [content]);
};

const ForecastTabContent = ({currentDay, settings}) => {
  const { tempMetric, speedMetric } = settings;

  return (
    <>
      <Grid container>
        <Grid item xs={9} sx={{ml: "auto"}}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>Humidity: {currentDay?.day.avghumidity} %</Typography>
              <Typography>Max temperature: {currentDay?.day[`maxtemp_${tempMetric}`]} °{tempMetric}</Typography>
              <Typography>Average temperature: {currentDay?.day[`avgtemp_${tempMetric}`]} °{tempMetric}</Typography>
              <Typography>Min temperature: {currentDay?.day[`mintemp_${tempMetric}`]} °{tempMetric}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography> Condition: {currentDay?.day.condition.text}</Typography>
              <Typography>Chance of rain: {currentDay.day?.daily_chance_of_rain} %</Typography>
              <Typography>Max wind: {currentDay.day[`maxwind_${speedMetric}`]} {speedMetric}</Typography>
            </Grid>
            <Grid item xs={2}>
              <img src={currentDay?.day.condition.icon} alt={currentDay?.day.condition.text}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{mt: 3}}>
        <Box className={style.hourly}>
          {currentDay.hour.map((current) => {
            //console.log();
            return (
              <Box
                key={current?.time_epoch}
                className={style.hourTemperature}
                sx={{height: "100%"}}
              >
                <Typography fontSize={10} mb="auto">{dayjs(new Date(current.time)).hour()}:00</Typography>
                <Typography fontSize={14}>{current[`temp_${tempMetric}`]}</Typography>
                <Box
                  className={style.hourTemperatureCol}
                  style={{height: (2 * current[`temp_${tempMetric}`]) + "px"}}
                >
                </Box>
              </Box>
            )
          })}
        </Box>
      </Grid>
    </>

  );
}

export default useForecastForTabs;
