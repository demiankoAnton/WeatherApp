import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, API_HEADERS, API_ENDPOINTS } from '../../../constants';

export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchWeather',
  async (city, { getState, rejectWithValue, dispatch }) => {
      const { lang } = getState().userSlice.settings;

      return await axios
        .get([API_URL, API_ENDPOINTS.forecast].join('/'), {
          headers: API_HEADERS,
          params: {
            q: city.toLowerCase(),
            days: '3',
            lang: lang ?? 'EN'
          }
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          let errorText = '';

          if (error.code === "ERR_NETWORK") {
            errorText = error.message;
          } else {
            errorText = error.response.data.error.message;
          }

          return rejectWithValue(errorText);
        });
  }
);
