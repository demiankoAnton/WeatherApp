import { useMemo } from 'react';

// TODO: Rethink and perhaps remove
const useUsersObject = () => {
  const users = localStorage.getItem("weatherAppUsersList");
  !users && localStorage.setItem("weatherAppUsersList", "{}");

  return useMemo(() => JSON.parse(users), [users]);
};

export default useUsersObject;
