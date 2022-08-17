import { createSlice } from '@reduxjs/toolkit';
import { fetchWeatherHistory } from './weatherHistory.thunks';
import {snackActions} from '../../../utils/notices';

const initialState = {
  date: null,
  historyDateForecast: null,
  currentRequestId: null,

};

const weatherHistorySlice = createSlice({
  name: 'weatherHistory',
  initialState,
  reducers: {
    setHistoryDateForecast(state, action) {
      state.historyDateForecast = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherHistory.pending, (state, { meta }) => {
      state.currentRequestId = meta.requestId;
    });
    builder.addCase(fetchWeatherHistory.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.currentRequestId === requestId) {
        state.currentRequestId = undefined;

        state.historyDateForecast = action.payload;
      }
    });
    builder.addCase(fetchWeatherHistory.rejected, (state, action) => {
      const { requestId } = action.meta;

      if (state.currentRequestId === requestId) {
        state.currentRequestId = undefined;

        snackActions.error(action.payload);
      }
    });
  }
});

export const { setHistoryDateForecast } = weatherHistorySlice.actions;

export default weatherHistorySlice.reducer;
