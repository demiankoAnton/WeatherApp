import PageContainer from '../../components/PageContainer';
import {useDispatch} from 'react-redux';

import { default as FavoritesList } from '../../components/List';
import {useCallback} from 'react';

import {Grid} from '@mui/material';
import useEventsForList from '../../hooks/useEventsForList';
import useCitiesForList from '../../hooks/useCitiesForList';
import {
  removeCityFromFavorite,
  removeEventFromFavorites,
} from '../../redux/slices/userSlice/user.slice';
import {useNavigate} from 'react-router-dom';

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

  const onClickEventListItem = useCallback((event, e) => {
    // TODO: Implement navigation to single event page
  }, []);

  const onClickDeleteEventListItem = useCallback((event) => {
    dispatch(removeEventFromFavorites(event));
  }, []);

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
              onClickItem={onClickEventListItem}
              onClickDeleteItem={onClickDeleteEventListItem}
            />
          </Grid>
        </Grid>
      </div>
    </PageContainer>
  );
}

export default Favorites;
