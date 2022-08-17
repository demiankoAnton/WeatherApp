const API_URL = 'https://weatherapi-com.p.rapidapi.com';

const API_HEADERS = {
  'X-RapidAPI-Key': '33afbdd3camshded68e8c8488c7cp11f676jsn3e972dc743d1',
  'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
};

const API_ENDPOINTS = {
  forecast: 'forecast.json',
  history: 'history.json',
  search: 'search.json',
  sports: 'sports.json'
};

const LANGUAGES = [
  "EN",
  "UA"
];

const THEMES = {
  light: 'light',
  dark: 'dark'
};

const DEFAULT_USER_SETTINGS = {
  login: null,
  password: null,
  isLoggedIn: null,
  isVerified: false,
  validationKey: null,
  settings: {
    lang: 'EN',
    theme: 'light',
    tempMetric: 'c',
    speedMetric: "kph",
    firstName: null,
    lastName: null,
    email: null
  },
  favorites: {
    cities: [],
    events: []
  },
};


export {
  API_URL,
  API_HEADERS,
  API_ENDPOINTS,
  LANGUAGES,
  THEMES,
  DEFAULT_USER_SETTINGS
};

