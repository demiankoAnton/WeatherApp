import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentUser } from '../redux/slices/userSlice/user.slice';

const useUser = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("weatherAppUser");

  useEffect(() => {
    if (user) {
      dispatch(setCurrentUser(JSON.parse(user)));
    }
  }, [user, dispatch]);

  return useMemo(() => user, [user]);
};

export default useUser;
