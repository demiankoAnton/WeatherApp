import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { lightTheme, darkTheme } from '../theme';
import { getUserTheme } from '../redux/slices/userSlice/user.selectors';

const useTheme = () => {
  const userTheme = useSelector(getUserTheme);

  return useMemo(() => {
    return userTheme === 'dark' ? darkTheme : lightTheme;
  }, [userTheme]);
};

export default useTheme;
