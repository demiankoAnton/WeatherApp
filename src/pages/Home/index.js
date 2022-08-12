import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';

import { removeCityFromFavorite } from '../../redux/slices/userSlice/user.slice';

import Search from '../../components/Search';
import PageContainer from '../../components/PageContainer';
import { default as FavoritesList } from '../../components/List';
import Forecast from '../../components/Forecast';

import useEventsForList from '../../hooks/useEventsForList';
import useCitiesForList from '../../hooks/useCitiesForList';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const preparedCities = useCitiesForList();
  const preparedEvents = useEventsForList();

  const onClickCityListItem = useCallback((event, city) => {
    navigate(`/city/${city}`);
  }, []);

  const onClickDeleteListItem = useCallback((city) => {
    dispatch(removeCityFromFavorite(city));
  }, [dispatch]);

  return (
    <PageContainer>
        <Box py={4}>
          <div className={"container"}>
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <Search />
              </Grid>
              <Grid item xs={3}>
                <FavoritesList
                  items={preparedCities ?? {}}
                  onClickItem={onClickCityListItem}
                  onClickDeleteItem={onClickDeleteListItem}
                />
                <FavoritesList
                  items={preparedEvents ?? {}}
                  //onClickItem={onClickDeleteListItem}
                />
              </Grid>
              <Grid item xs={9} mt={2}>
                <Forecast />
              </Grid>
            </Grid>
          </div>
        </Box>
    </PageContainer>
  );
}

export default Home;
