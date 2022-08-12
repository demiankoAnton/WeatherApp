import { createSlice } from '@reduxjs/toolkit';
import { fetchWeatherSearch } from './weatherSearch.thunks';

const initialState = {
  cities: [],
};

const weatherSearchSlice = createSlice({
  name: 'weatherSearch',
  initialState,
  reducers: {
    // setCurrentCity(state, action) {
    //   state.currentCity = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherSearch.pending, (state, action) => {
      //console.log('pending');
    });

    builder.addCase(fetchWeatherSearch.fulfilled, (state, action) => {
      //console.log('fulfilled');
      state.cities = action.payload;
    });

    builder.addCase(fetchWeatherSearch.rejected, (state, action) => {
      //console.log('rejected');
    });
  }
});

export default weatherSearchSlice.reducer;
