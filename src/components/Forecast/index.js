import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as UILink, Paper, Grid, IconButton, CircularProgress, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import useForecastCity from '../../hooks/useForecastCity';
import useForecastForTabs from '../../hooks/useForecastForTabs';

import MUITabs from '../generic/MUITabs';

import {
  addCityToFavorite,
  removeCityFromFavorite,
} from '../../redux/slices/userSlice/user.slice';
import {
  getFavoriteCities,
  getUserLang,
} from '../../redux/slices/userSlice/user.selectors';
import { getIsLoading } from '../../redux/slices/weatherForecastSlice/weatherForecast.selectors';

import i18l from '../../l18i.json';

const Forecast = () => {
  const dispatch = useDispatch();
  const language = useSelector(getUserLang);
  const favoriteCities = useSelector(getFavoriteCities);
  const isLoading = useSelector(getIsLoading);
  const [isFavorite, setIsFavorite] = useState(false);

  const city = useForecastCity();
  const content = useForecastForTabs(city);

  const iconStyle = isFavorite ? {color: "#F3584E"} : null;

  useEffect(() => {
    setIsFavorite(!!favoriteCities.length && favoriteCities.includes(city?.location.name));
  }, [city, favoriteCities]);

  const onClickFavorite = useCallback(() => {
    if (!isFavorite) {
      setIsFavorite(true);
      dispatch(addCityToFavorite(city.location.name));
    } else {
      setIsFavorite(false);
      dispatch(removeCityFromFavorite(city.location.name));
    }
  }, [city, isFavorite, dispatch]);

  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        minHeight: "390px",
        backgroundColor: "rgba(255, 255, 255, 0.3)"
      }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      {city && (
        <Paper className="forecast" elevation={3} sx={{p: 2}}>
          <Grid container spacing={2} position={"relative"}>
            <Grid item xs={3} sx={{position: "absolute", top: 10, zIndex: 10 }}>
              <h3>{i18l.components.Forecast.country[language]}: {city.location.country}</h3>
              <UILink target="_blank" href={`https://www.google.com/maps/@${city.location.lat},${city.location.lon},10z`} rel="noreferrer">
                <span>{i18l.components.Forecast.geoLocation.lat[language]}: {city.location.lat} </span>
                <span>{i18l.components.Forecast.geoLocation.lon[language]}: {city.location.lon}</span>
              </UILink>
              <h4>{i18l.components.Forecast.city[language]}: {city.location.name}</h4>
              <h4>{i18l.components.Forecast.province[language]}: {city.location.region}</h4>
            </Grid>

            {content && (
              <Grid item xs={12} sx={{ "& .MuiBox-root .MuiTabs-root": { ml: "25%" } }}>
                <IconButton
                  sx={{position: "absolute", right: 0, zIndex: 10}}
                  aria-label="add to favorites"
                  onClick={onClickFavorite}
                >
                  <FavoriteIcon sx={iconStyle} />
                </IconButton>
                <MUITabs tabsContent={content} />
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
    </>
  );
}

export default Forecast;
