import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';

import {
  getUserFirstName,
  getUserLang,
} from '../../redux/slices/userSlice/user.selectors';
import { logOut } from '../../redux/slices/userSlice/user.slice';

import i18l from '../../l18i.json';

const UserMenu = () => {
  const dispatch = useDispatch();
  const language = useSelector(getUserLang);
  const name = useSelector(getUserFirstName);
  const [isOpened, setIsOpened] = useState(false);

  const onClickLogout = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  const toggleDrawer = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  return (
    <Box>
      <Avatar
        onClick={toggleDrawer}
        alt="User avatar" src="https://mui.com/static/images/avatar/1.jpg"
      />
      <Drawer
        open={isOpened}
        onClose={toggleDrawer}
        anchor="right"
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "transparent"
          },
          "& .MuiDrawer-paper": {
            backdropFilter: "blur(20px)",
          }
        }}
      >
        <Box
          sx={{width: 250}}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Avatar
            sx={{height: 64, width: 64, margin: "10px auto"}}
            onClick={toggleDrawer}
            alt="User avatar" src="https://mui.com/static/images/avatar/1.jpg"
          />
          <Typography variant="h6" textAlign="center">{name}</Typography>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton sx={{
                "#dark & a": {
                  color: "red"
                }
              }}>
                <Link to="/favorites">
                  {i18l.components.UserMenu.favorites[language]}
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to="/settings">
                  {i18l.components.UserMenu.settings[language]}
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to="/auth" onClick={onClickLogout}>
                  {i18l.components.UserMenu.logout[language]}
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}

export default UserMenu;
