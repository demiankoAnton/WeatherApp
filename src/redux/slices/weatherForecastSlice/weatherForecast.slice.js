import { createSlice } from '@reduxjs/toolkit';

import { fetchWeatherForecast } from './weatherForecast.thunks';

const initialState = {
  status: 'idle',
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
    builder.addCase(fetchWeatherForecast.fulfilled, (state, { meta }) => {
      const { requestId } = meta;

      if (state.currentRequestId === requestId) {
        state.currentRequestId = undefined;
        state.isLoading = false;
      }
    });
    builder.addCase(fetchWeatherForecast.rejected, (state, { meta }) => {
      const { requestId } = meta;

      if (state.currentRequestId === requestId) {
        state.currentRequestId = undefined;
        state.isLoading = false;
      }
    });
  }
});

export const { setCurrentCity } = weatherForecastSlice.actions;

export default weatherForecastSlice.reducer;
