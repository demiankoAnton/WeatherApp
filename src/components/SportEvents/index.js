import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Box, Divider, Typography} from '@mui/material';

import { fetchWeatherSportEvents } from '../../redux/slices/weatherSportEventsSlice/weatherSportsEvents.thunks';
import { getSportEvents } from '../../redux/slices/weatherSportEventsSlice/weatherSportsEvents.selectors';

import EventCard from './EventCard';

import style from './SportEvents.module.scss';
import {getCity} from '../../redux/slices/weatherForecastSlice/weatherForecast.selectors';

const SportEvents = () => {
  const dispatch  = useDispatch();
  const city = useSelector(getCity);
  const sportEvents = useSelector(getSportEvents);

  useEffect(() => {
    dispatch(fetchWeatherSportEvents(city.location.name));
  }, [city, dispatch]);

  return (
    <>
      {sportEvents && (
        <>
          {sportEvents?.football.length > 0 && (
            <Box>
              <Typography sx={{fontSize: 25, my: 2}}>Football Events</Typography>
              <Divider />
              <div className={style.eventsContainer}>
                {sportEvents.football.map((event) => (
                  <EventCard
                    key={event.match}
                    event={event}
                    eventType="soccer"
                  />
                ))}
              </div>
            </Box>
          )}
          {sportEvents?.cricket.length > 0 && (
            <Box>
              <Typography sx={{fontSize: 25, my: 2}}>Cricket Events</Typography>
              <Divider />
              <div className={style.eventsContainer}>
                {sportEvents.cricket.map((event) => (
                  <EventCard
                    key={event.match}
                    event={event}
                    eventType="cricket"
                  />
                ))}
              </div>
            </Box>
          )}
          {sportEvents?.golf.length > 0 && (
            <Box>
              <Typography sx={{fontSize: 25, my: 2}}>Golf Events</Typography>
              <Divider />
              <div className={style.eventsContainer}>
                {sportEvents.football.map((event) => (
                  <EventCard
                    key={event.match}
                    event={event}
                    eventType="golf"
                  />
                ))}
              </div>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default SportEvents;
