import {useCallback, useState} from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {default as DateFns} from '@date-io/date-fns';
import {useDispatch} from 'react-redux';
import { fetchWeatherHistory } from '../../redux/slices/weatherHistorySlice/weatherHistory.thunks';
import Forecast from '../Forecast';

const History = () => {
  const dispatch = useDispatch();
  const date = new DateFns();
  const [currentDate, setCurrentDate] = useState(null);

  const onChangeDate = useCallback((event) => {
    const current = date.formatByString(event, "yyyy-MM-dd");
    setCurrentDate(current);
    dispatch(fetchWeatherHistory(current));
  }, []);

  return (
    <div>
      <DatePicker
        onChange={onChangeDate}
        renderInput={(params) => <TextField value={currentDate} {...params} />}
      />
      <Forecast />
    </div>
  );
};

export default History;
