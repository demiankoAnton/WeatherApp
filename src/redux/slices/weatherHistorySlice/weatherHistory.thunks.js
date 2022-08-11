import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setHistoryDateForecast } from './weatherHistory.slice';

import { API_URL, API_HEADERS, API_ENDPOINTS } from '../../../constants';
import { setCurrentCity } from '../weatherForecastSlice/weatherForecast.slice';

export const fetchWeatherHistory = createAsyncThunk(
  'weather/fetchWeatherHistory',
  async (date, {getState , rejectWithValue, dispatch }) => {
    try {
      const { currentCity } = getState().weatherForecastSlice;
      const { lang } = getState().userSlice.settings;

      const response = await axios.get([API_URL, API_ENDPOINTS.history].join('/'), {
        headers: API_HEADERS,
        params: {
          q: currentCity.location.name,
          dt: date ?? '',
          lang: lang ?? 'EN'
        }
      }).then((response) => response.data);

      dispatch(setHistoryDateForecast(response));
      dispatch(setCurrentCity(response));
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
