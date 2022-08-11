import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice/user.slice';
import weatherForecastSlice from './slices/weatherForecastSlice/weatherForecast.slice';
import weatherHistorySlice from './slices/weatherHistorySlice/weatherHistory.slice';
import weatherSearchSlice from './slices/weatherSearchSlice/weatherSearch.slice';
import weatherSportsEventsSlice from './slices/weatherSportEventsSlice/weatherSportsEvents.slice';

export const store = configureStore({
  reducer: {
    userSlice,
    weatherForecastSlice,
    weatherHistorySlice,
    weatherSearchSlice,
    weatherSportsEventsSlice
  }
});
