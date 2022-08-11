import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, API_ENDPOINTS, API_HEADERS } from '../../../constants';

export const fetchWeatherSearch = createAsyncThunk(
  'weatherSearch',
  async (value, {getState, rejectWithValue, dispatch}) => {
    try {
      const { lang } = getState().userSlice.settings;

      const response = await axios
      .get([API_URL, API_ENDPOINTS.search].join('/'), {
          headers: API_HEADERS,
          params: {
            q: value.toLowerCase(),
            lang: lang ?? 'EN'
          },
        })
        .then(({ data }) => data);

      return response;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
