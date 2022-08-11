import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getFavoriteEvents} from '../redux/slices/userSlice/user.selectors';

const useEventsForList = () => {
  const events = useSelector(getFavoriteEvents);
  return useMemo(() => {
    return events && events.map((event) => {
      return { name: event.match };
    });
  }, [events]);
};

export default useEventsForList;
