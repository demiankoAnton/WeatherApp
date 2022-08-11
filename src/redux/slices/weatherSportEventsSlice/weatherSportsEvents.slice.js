import  { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: null,
  events: null,
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
    //
  }
});

export const { setCurrentCity, setCurrentSportEvents } = weatherSportsEventsSlice.actions;

export default weatherSportsEventsSlice.reducer;
