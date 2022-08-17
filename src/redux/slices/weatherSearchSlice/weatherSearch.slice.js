import { createSlice } from '@reduxjs/toolkit';

import { fetchWeatherSearch } from './weatherSearch.thunks';

import { snackActions } from '../../../utils/notices';

const initialState = {
  cities: [],
  currentRequestId: null
};

const weatherSearchSlice = createSlice({
  name: 'weatherSearch',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherSearch.pending, (state, { meta }) => {
      state.currentRequestId = meta.requestId;
    });
    builder.addCase(fetchWeatherSearch.fulfilled, (state, action) => {
      const { requestId } = action.meta;

      if (state.currentRequestId === requestId) {
        state.currentRequestId = undefined;
        state.cities = action.payload;
      }
    });
    builder.addCase(fetchWeatherSearch.rejected, (state, action) => {
      const { requestId } = action.meta;

      if (state.currentRequestId === requestId) {
        state.currentRequestId = undefined;
        snackActions.error(action.payload);
      }
    });
  }
});

export default weatherSearchSlice.reducer;
