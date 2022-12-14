export const getUser = (state) => state.userSlice;

export const getUserFirstName = (state) => state.userSlice.settings.firstName;

export const getUserLastName = (state) => state.userSlice.settings.lastName;

export const getUserTheme = (state) => state.userSlice.settings.theme;

export const getUserLang = (state) => state.userSlice.settings.lang;

export const getFavoriteCities = (state) => state.userSlice.favorites.cities;

export const getFavoriteEvents = (state) => state.userSlice.favorites.events;

export const getUserSettings = (state) => state.userSlice.settings;

export const getIsUserLoggedIn = (state) => state.userSlice.isLoggedIn;
