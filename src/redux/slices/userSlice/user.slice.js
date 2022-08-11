import { createSlice } from '@reduxjs/toolkit';

import { setToLocalStorage } from '../../../utils/user';
import { DEFAULT_USER_SETTINGS } from '../../../constants';

const initialState = {
  ...DEFAULT_USER_SETTINGS,
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSettings(state, action) {
      state.settings = action.payload;

      setToLocalStorage(state);
    },

    setLanguage(state, action) {
      state.settings.lang = action.payload;

      setToLocalStorage(state);
    },

    setTheme(state, action) {
      state.settings.theme = action.payload ? 'dark' : 'light';

      setToLocalStorage(state);
    },

    addCityToFavorite(state, action) {
      state.favorites.cities = [...state.favorites.cities, action.payload];

      setToLocalStorage(state);
    },

    removeCityFromFavorite(state, action) {
      state.favorites.cities = state.favorites.cities.filter((city) => {
        if (city.toLowerCase() === action.payload.toLowerCase()) {
          return false;
        }

        return city;
      });

      setToLocalStorage(state);
    },

    addEventToFavorites(state, action) {
      state.favorites.events = [...state.favorites.events, action.payload];

      setToLocalStorage(state);
    },

    removeEventFromFavorites(state, action) {
      state.favorites.events = state.favorites.events.filter((event) => {
        if (event.match === action.payload) {
          return false;
        }

        return event;
      });

      setToLocalStorage(state);
    },

    setCurrentUser(state, action) {
      localStorage.setItem(
        "weatherAppUser",
        JSON.stringify({...action.payload, isLoggedIn: true})
      );

      return {...action.payload, isLoggedIn: true};
    },

    addUserToList(state, action) {
      if (state.isLoggedIn) {
        const usersListObject = JSON.parse(localStorage.getItem("weatherAppUsersList"));
        localStorage.setItem("weatherAppUsersList", JSON.stringify({...usersListObject}, action.payload))
      }
    },

    logOut() {
      localStorage.removeItem('weatherAppUser');
      return DEFAULT_USER_SETTINGS;
    }
  }
});

export const {
  setUserSettings,
  setTheme,
  addCityToFavorite,
  removeCityFromFavorite,
  addEventToFavorites,
  removeEventFromFavorites,
  setCurrentUser,
  addUserToList,
  setLanguage,
  logOut
} = userSlice.actions;

export default userSlice.reducer;
