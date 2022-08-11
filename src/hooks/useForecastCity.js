import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCity } from '../redux/slices/weatherForecastSlice/weatherForecast.selectors';
import { useLocation, useParams } from 'react-router-dom';
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

  return useMemo(() => city, [city, cityName, pathname]);
}

export default useForecastCity;
