import {useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice/user.slice';

const useUser = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("weatherAppUser");

  useEffect(() => {
    if (user) {
      dispatch(setCurrentUser(JSON.parse(user)));
    }
  }, [user]);

  return useMemo(() => user, [user]);
};

export default useUser;
