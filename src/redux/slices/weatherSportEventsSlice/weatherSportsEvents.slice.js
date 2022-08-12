import  { createSlice } from '@reduxjs/toolkit';
import { fetchWeatherSportEvents } from './weatherSportsEvents.thunks';

const initialState = {
  city: null,
  events: null,
  isLoading: false
};

const weatherSportsEventsSlice = createSlice({
  name: "weatherSportsEventsSlice",
  initialState,
  reducers: {
    setCurrentCity(state, action) {
      state.city = action.payload;
    },
    setCurrentSportEvents(state, action) {
      state.events = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherSportEvents.pending, (state, { meta }) => {
      state.currentRequestId = meta.requestId;
      state.isLoading = true;
    });
    builder.addCase(fetchWeatherSportEvents.fulfilled, (state, { meta }) => {
      const { requestId } = meta;

      if (state.currentRequestId === requestId) {
        state.currentRequestId = undefined;
        state.isLoading = false;
      }
    });
    builder.addCase(fetchWeatherSportEvents.rejected, (state, { meta }) => {
      const { requestId } = meta;

      if (state.currentRequestId === requestId) {
        state.currentRequestId = undefined;
        state.isLoading = false;
      }
    });
  }
});

export const { setCurrentCity, setCurrentSportEvents } = weatherSportsEventsSlice.actions;

export default weatherSportsEventsSlice.reducer;
