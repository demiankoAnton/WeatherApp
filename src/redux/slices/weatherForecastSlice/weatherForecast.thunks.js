import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, API_HEADERS, API_ENDPOINTS } from '../../../constants';
import { setCurrentCity } from './weatherForecast.slice';

export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchWeather',
  async (city, { getState, rejectWithValue, dispatch }) => {
    try {
      const { lang } = getState().userSlice.settings;

      const response = await axios.get([API_URL, API_ENDPOINTS.forecast].join('/'), {
        headers: API_HEADERS,
        params: {
          q: city.toLowerCase(),
          days: '3',
          lang: lang ?? 'EN'
        }
      }).then((response) => response.data);

      dispatch(setCurrentCity(response));

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
