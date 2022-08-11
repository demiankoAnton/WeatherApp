import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS, API_HEADERS, API_URL} from '../../../constants';
import { setCurrentSportEvents } from './weatherSportsEvents.slice';

export const fetchWeatherSportEvents = createAsyncThunk(
  'weatherSportEvents',
  async (value, { getState, rejectWithValue, dispatch }) => {
    try {
      const { lang } = getState().userSlice.settings;

      const response = await axios
      .get([API_URL, API_ENDPOINTS.sports].join('/'), {
        headers: API_HEADERS,
        params: {
          q: value ?? '',
          lang: lang ?? 'EN'
        }
      })
      .then(({ data }) => data);

      dispatch(setCurrentSportEvents(response));

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
