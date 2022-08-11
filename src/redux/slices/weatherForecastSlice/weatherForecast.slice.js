import { createSlice } from '@reduxjs/toolkit';

import { fetchWeatherForecast } from './weatherForecast.thunks';

const initialState = {
  status: 'idle',
  errors: null,
  currentCity: null
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
    builder.addCase(fetchWeatherForecast.pending, (state, action) => {
      //
    });
    builder.addCase(fetchWeatherForecast.fulfilled, (state, action) => {
      //
    });
    builder.addCase(fetchWeatherForecast.rejected, (state, action) => {
      // console.log(action);
    });
  }
});

export const { setCurrentCity } = weatherForecastSlice.actions;

export default weatherForecastSlice.reducer;
