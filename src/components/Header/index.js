import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { setTheme } from '../../redux/slices/userSlice/user.slice';
import {
  getIsUserLoggedIn, getUserLang,
  getUserTheme,
} from '../../redux/slices/userSlice/user.selectors';

import ThemeSwitch from '../generic/ThemeSwitch';
import LangSwitcher from '../generic/LangSwitcher';
import UserMenu from '../UserMenu';

import i18l from '../../l18i.json';

import logo from '../../assets/images/weatherLogo.svg';
import style from './Header.module.scss';

const Header = memo(() => {
  const dispatch = useDispatch();
  const language = useSelector(getUserLang);
  const userTheme = useSelector(getUserTheme);
  const isLoggedIn = useSelector(getIsUserLoggedIn);

  const onClickThemeSwitch = useCallback((event) => {
    dispatch(setTheme(event.target.checked));
  }, [dispatch, userTheme]);

  return (
    <header>
      <div className={style.header + " container"}>
        <Link to="/home">
          <div className={style.logoContainer}>
            <img src={logo} alt="Logo" width={48} height={48}/>
          </div>
        </Link>
        <nav>
          <ul className={style.mainNavList}>
            <li>
              <Link to="/home">{i18l.components.Header.menu.home[language]}</Link>
            </li>
          </ul>
        </nav>
        <div className={style.settingsContainer + " settingsContainer"}>
          <div className={style.themeContainer}>
            <Typography variant="span">{i18l.components.Header.theme[language]}</Typography>
            <ThemeSwitch
              sx={{m: 1}}
              checked={userTheme === 'dark' ?? false}
              onClick={onClickThemeSwitch}
            />
          </div>
          <LangSwitcher />
        </div>
        <div className={style.authContainer}>
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
