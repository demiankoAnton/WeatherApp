import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, API_ENDPOINTS, API_HEADERS } from '../../../constants';

export const fetchWeatherSearch = createAsyncThunk(
  'weatherSearch',
  async (value, { rejectWithValue }) => {
    return await axios
      .get([API_URL, API_ENDPOINTS.search].join('/'), {
        headers: API_HEADERS,
        params: {
          q: value.toLowerCase()
        },
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
  },
);
