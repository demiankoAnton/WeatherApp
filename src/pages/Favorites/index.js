import {useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';

import {
  removeCityFromFavorite,
  removeEventFromFavorites,
} from '../../redux/slices/userSlice/user.slice';

import useEventsForList from '../../hooks/useEventsForList';
import useCitiesForList from '../../hooks/useCitiesForList';

import PageContainer from '../../components/PageContainer';

import { default as FavoritesList } from '../../components/List';

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const preparedCities = useCitiesForList();
  const preparedEvents = useEventsForList();

  const onClickCityListItem = useCallback((event, city) => {
    navigate(`/city/${city}`);
  }, [navigate]);

  const onClickDeleteCityListItem = useCallback((city) => {
    dispatch(removeCityFromFavorite(city));
  }, [dispatch]);

  const onClickDeleteEventListItem = useCallback((event) => {
    dispatch(removeEventFromFavorites(event));
  }, [dispatch]);

  return (
    <PageContainer>
      <div className={"container"}>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={6}>
            <FavoritesList
              title="Favorite Cities"
              items={preparedCities ?? {}}
              onClickItem={onClickCityListItem}
              onClickDeleteItem={onClickDeleteCityListItem}
            />
          </Grid>
          <Grid item xs={6}>
            <FavoritesList
              title="Favorite Events"
              items={preparedEvents ?? {}}
              onClickDeleteItem={onClickDeleteEventListItem}
            />
          </Grid>
        </Grid>
      </div>
    </PageContainer>
  );
}

export default Favorites;
