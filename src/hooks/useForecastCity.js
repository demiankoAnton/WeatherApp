import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { getCity } from '../redux/slices/weatherForecastSlice/weatherForecast.selectors';
import { fetchWeatherForecast } from '../redux/slices/weatherForecastSlice/weatherForecast.thunks';

const useForecastCity = () => {
  const dispatch = useDispatch();
  const city = useSelector(getCity);
  const { pathname } = useLocation();
  const { cityName } = useParams();

  useEffect(() => {
    if (cityName && pathname.includes('city')) {
      dispatch(fetchWeatherForecast(cityName));
    }
  }, [cityName, pathname, dispatch]);

  return useMemo(() => city, [city]);
}

export default useForecastCity;
