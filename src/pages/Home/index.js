import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import { removeCityFromFavorite } from '../../redux/slices/userSlice/user.slice';

import Search from '../../components/Search';
import PageContainer from '../../components/PageContainer';
import { default as FavoritesList } from '../../components/List';
import Forecast from '../../components/Forecast';

import useEventsForList from '../../hooks/useEventsForList';
import useCitiesForList from '../../hooks/useCitiesForList';

import style from './Home.module.scss';

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
        <div className={style.homePage}>
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
        </div>
    </PageContainer>
  );
}

export default Home;
