import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: null,
  historyDateForecast: null
};

const weatherHistorySlice = createSlice({
  name: 'weatherHistory',
  initialState,
  reducers: {
    setHistoryDate(state, action) {
      state.date = action.payload;
    },
    setHistoryDateForecast(state, action) {
      state.historyDateForecast = action.payload;
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchWeatherHistory.pending, (state, action) => {
    //   //
    // });
    // builder.addCase(fetchWeatherForecast.fulfilled, (state, action) => {
    //   //
    // });
    // builder.addCase(fetchWeatherForecast.rejected, (state, action) => {
    //   // console.log(action);
    // });
  }
});

export const { setHistoryDate, setHistoryDateForecast } = weatherHistorySlice.actions;

export default weatherHistorySlice.reducer;
