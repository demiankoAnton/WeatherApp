import { useCallback, useState, useMemo } from 'react';
import {useDispatch} from 'react-redux';
import { Paper, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { fetchWeatherHistory } from '../../redux/slices/weatherHistorySlice/weatherHistory.thunks';

import Forecast from '../Forecast';

const History = () => {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));

  const minDate = useMemo(() => {
    return dayjs().subtract(7, 'day');
  }, []);

  const maxDate = useMemo(() => {
    return dayjs().add(1, 'day');
  }, []);

  const onChangeDate = useCallback((event) => {
    const current = dayjs(event).format("YYYY-MM-DD")
    setCurrentDate(current);
    dispatch(fetchWeatherHistory(current));
  }, []);

  return (
    <div className="historyDatePicker">
      <Paper elevation={3} sx={{
        position: "absolute",
        top: 0,
        right: 0
      }}>
        <DatePicker
          onChange={onChangeDate}
          renderInput={(params) => <TextField value={currentDate} {...params} />}
          value={currentDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Paper>

      <Forecast />
    </div>
  );
};

export default History;
