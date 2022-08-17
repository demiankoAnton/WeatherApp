import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getFavoriteCities } from '../redux/slices/userSlice/user.selectors';

const useCitiesForList = () => {
  const cities = useSelector(getFavoriteCities);
  return useMemo(() => {
    return cities && cities.map((city) => {
      return { name: city };
    });
  }, [cities]);
};

export default useCitiesForList;
