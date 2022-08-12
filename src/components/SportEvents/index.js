import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Box, Divider, Typography} from '@mui/material';

import { fetchWeatherSportEvents } from '../../redux/slices/weatherSportEventsSlice/weatherSportsEvents.thunks';
import {
  getIsLoading,
  getSportEvents,
} from '../../redux/slices/weatherSportEventsSlice/weatherSportsEvents.selectors';
import { getCity } from '../../redux/slices/weatherForecastSlice/weatherForecast.selectors';

import EventCard from './EventCard';
import EventSkeleton from './EventSkeleton';

import style from './SportEvents.module.scss';

const SportEvents = () => {
  const dispatch  = useDispatch();
  const city = useSelector(getCity);
  const isLoading = useSelector(getIsLoading)
  const sportEvents = useSelector(getSportEvents);

  const skeletonGrid = useMemo(() => {
    return [...Array(8)].map((_, index) => <EventSkeleton key={index}/>);
  }, []);

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
                {isLoading
                  ? skeletonGrid
                  : sportEvents.football.map((event) => (
                    <EventCard
                      key={event.match + `_soccer`}
                      event={event}
                      eventType="soccer"
                    />
                  ))
                }
              </div>
            </Box>
          )}
          {sportEvents?.cricket.length > 0 && (
            <Box>
              <Typography sx={{fontSize: 25, my: 2}}>Cricket Events</Typography>
              <Divider />
              <div className={style.eventsContainer}>
                {isLoading
                  ? skeletonGrid
                  : sportEvents.cricket.map((event) => (
                    <EventCard
                      key={event.match + `_cricket`}
                      event={event}
                      eventType="cricket"
                    />
                  ))
                }
              </div>
            </Box>
          )}
          {sportEvents?.golf.length > 0 && (
            <Box>
              <Typography sx={{fontSize: 25, my: 2}}>Golf Events</Typography>
              <Divider />
              <div className={style.eventsContainer}>
                {isLoading
                  ? skeletonGrid
                  : sportEvents.football.map((event) => (
                    <EventCard
                      key={event.match + `_golf`}
                      event={event}
                      eventType="golf"
                      isLoading={isLoading}
                    />
                  ))
                }
              </div>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default SportEvents;
