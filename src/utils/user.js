export const setToLocalStorage = (state) => {
  const usersListObject = JSON.parse(localStorage.getItem("weatherAppUsersList"));

  localStorage.setItem("weatherAppUser", JSON.stringify(state));

  if (usersListObject) {
    // // TODO recode to for
    Object.keys(usersListObject).map((user) => {
      if (usersListObject[user].login === state.login) {
        usersListObject[user] = {...usersListObject[user], ...state};
      }

      return user;
    });

    localStorage.setItem("weatherAppUsersList", JSON.stringify(usersListObject))
  }
};
