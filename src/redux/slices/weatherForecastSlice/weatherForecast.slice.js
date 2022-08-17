import { createSlice } from '@reduxjs/toolkit';

import { fetchWeatherForecast } from './weatherForecast.thunks';
import { snackActions } from '../../../utils/notices';

const initialState = {
  errors: null,
  currentCity: null,
  isLoading: false
};

const weatherForecastSlice = createSlice({
  name: 'weatherForecast',
  initialState,
  reducers: {
    setCurrentCity(state, action) {
      state.currentCity = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherForecast.pending, (state, { meta }) => {
      state.currentRequestId = meta.requestId;
      state.isLoading = true;
    });
    builder.addCase(fetchWeatherForecast.fulfilled, (state, action) => {
      const { requestId } = action.meta;

      if (state.currentRequestId === requestId) {
        state.currentRequestId = undefined;
        state.isLoading = false;

        state.currentCity = action.payload;
      }
    });
    builder.addCase(fetchWeatherForecast.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.currentRequestId === requestId) {
        state.currentRequestId = undefined;
        state.isLoading = false;

        snackActions.error(action.payload);
      }
    });
  }
});

export const { setCurrentCity } = weatherForecastSlice.actions;

export default weatherForecastSlice.reducer;
