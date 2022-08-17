import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';

import { SnackbarUtilsConfigurator } from './utils/notices';

import useUser from './hooks/useUser';
import useTheme from './hooks/useTheme';

import { getIsUserLoggedIn } from './redux/slices/userSlice/user.selectors';

import Auth from './pages/Auth';
import City from './pages/City';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Favorites from './pages/Favorites';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './routes/ProtectedRoute';

import bgDark from './assets/images/bg-dark.jpg';
import bgLight from './assets/images/bg-light.jpg';

import './App.scss';

function App() {
  const user = useUser();
  const isLoggedIn = useSelector(getIsUserLoggedIn);
  const theme = useTheme();


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={5}
            autoHideDuration={2000}
          >
            <SnackbarUtilsConfigurator />
            <CssBaseline />
            <div
              className="App"
              id={theme.palette.mode}
              style={{
                background: `url(${theme.palette.mode === 'dark' ? bgDark : bgLight})`,
              }}
            >

              <Router>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Favorites />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/auth"
                    element={<Auth/>}
                  />
                  <Route
                    path="/city/:cityName"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <City />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<PageNotFound/>}/>
                </Routes>
              </Router>
            </div>
          </SnackbarProvider>
        </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
