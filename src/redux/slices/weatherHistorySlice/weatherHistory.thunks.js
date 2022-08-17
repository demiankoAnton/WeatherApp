import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setCurrentCity } from '../weatherForecastSlice/weatherForecast.slice';

import { API_URL, API_HEADERS, API_ENDPOINTS } from '../../../constants';

export const fetchWeatherHistory = createAsyncThunk(
  'weather/fetchWeatherHistory',
  async (date, {getState , rejectWithValue, dispatch }) => {
    const { currentCity } = getState().weatherForecastSlice;

    return await axios
      .get([API_URL, API_ENDPOINTS.history].join('/'), {
        headers: API_HEADERS,
        params: {
          q: currentCity.location.name,
          dt: date ?? ''
        }
      })
      .then((response) => {
        dispatch(setCurrentCity(response.data));

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
