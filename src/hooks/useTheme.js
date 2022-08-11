import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getUserTheme } from '../redux/slices/userSlice/user.selectors';
import { lightTheme, darkTheme } from '../theme';

const useTheme = () => {
  const userTheme = useSelector(getUserTheme);

  return useMemo(() => {
    return userTheme === 'dark' ? darkTheme : lightTheme;
  }, [userTheme]);
};

export default useTheme;
