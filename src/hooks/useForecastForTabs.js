import { useMemo } from 'react';
import {useSelector} from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

import style from '../components/Forecast/Forecast.module.scss';
import {
  getUserLang,
  getUserSettings,
} from '../redux/slices/userSlice/user.selectors';

import i18l from '../l18i.json';

const useForecastForTabs = (content) => {
  const settings = useSelector(getUserSettings);

  return useMemo(() => {
    return content && content.forecast.forecastday.map((day) => {
      return {
        label: day.date,
        content: <ForecastTabContent currentDay={day} settings={settings}/>
      }
    });
  }, [content, settings]);
};

const ForecastTabContent = ({currentDay, settings}) => {
  const language = useSelector(getUserLang);
  const { tempMetric, speedMetric } = settings;

  const maxTemperatureValue = currentDay.hour.reduce((acc, item) => {
    acc = item[`temp_${tempMetric}`] > acc ? item[`temp_${tempMetric}`] : acc;

    return acc;
  }, 0);

  return (
    <>
      <Grid container>
        <Grid item xs={9} sx={{ml: "auto"}}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>{i18l.hooks.useForecastForTabs.humidity[language]}: {currentDay?.day.avghumidity} %</Typography>
              <Typography>{i18l.hooks.useForecastForTabs.maxTemperature[language]}: {currentDay?.day[`maxtemp_${tempMetric}`]} °{tempMetric}</Typography>
              <Typography>{i18l.hooks.useForecastForTabs.averageTemperature[language]}: {currentDay?.day[`avgtemp_${tempMetric}`]} °{tempMetric}</Typography>
              <Typography>{i18l.hooks.useForecastForTabs.minTemperature[language]}: {currentDay?.day[`mintemp_${tempMetric}`]} °{tempMetric}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography>{i18l.hooks.useForecastForTabs.condition[language]}: {currentDay?.day.condition.text}</Typography>
              <Typography>{i18l.hooks.useForecastForTabs.chanceOfRain[language]}: {currentDay.day?.daily_chance_of_rain} %</Typography>
              <Typography>{i18l.hooks.useForecastForTabs.maxWind[language]}: {currentDay.day[`maxwind_${speedMetric}`]} {speedMetric}</Typography>
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
                  style={{height: (70 / maxTemperatureValue) * current[`temp_${tempMetric}`] + "px"}}
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
