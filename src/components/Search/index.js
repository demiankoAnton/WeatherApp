import { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Autocomplete, TextField, debounce } from '@mui/material';

import { fetchWeatherForecast } from '../../redux/slices/weatherForecastSlice/weatherForecast.thunks';
import { fetchWeatherSearch } from '../../redux/slices/weatherSearchSlice/weatherSearch.thunks';
import { getCities } from '../../redux/slices/weatherSearchSlice/weatherSearch.selectors';
import { getUserLang } from '../../redux/slices/userSlice/user.selectors';

import { convertCities } from '../../utils/cities';
import i18l from '../../l18i.json';

import style from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const language = useSelector(getUserLang);
  const cities = useSelector(getCities);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchValue = useCallback(debounce((event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value && value.length > 2) {
      dispatch(fetchWeatherSearch(value));
    }
  }, 200), [dispatch]);

  const onSubmitSearch = useCallback((_, value) => {
    value && dispatch(fetchWeatherForecast(value.name));
  }, [dispatch]);

  const convertedCities = useMemo(() => {
    return convertCities(cities);
  }, [cities]);

  return (
    <Paper
      className={style.searchContainer}
      elevation={3}
    >
      <Autocomplete
        disablePortal
        autoHighlight
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={convertedCities}
        onInputChange={onChangeSearchValue}
        onClose={onChangeSearchValue}
        onChange={onSubmitSearch}
        renderInput={
          (params) =>
            <TextField
              {...params}
              value={searchValue}
              label={i18l.components.Search.label[language]}
            />
        }
      />
    </Paper>
  );
};

export default Search;
