import {useCallback, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem, Button, Box } from '@mui/material';

import { setLanguage } from '../../redux/slices/userSlice/user.slice';
import { getUserLang } from '../../redux/slices/userSlice/user.selectors';

import { LANGUAGES } from '../../constants';

const LangSwitcher = () => {
  const dispatch = useDispatch();
  const language = useSelector(getUserLang);
  const [anchorElement, setAnchorElement] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(language ?? 'EN');

  const onClickOpen = useCallback((event) => {
    setAnchorElement(event.currentTarget);
  }, []);

  const onClickSetLanguage = useCallback((event) => {
    setCurrentLanguage(event.target.textContent)
    dispatch(setLanguage(event.target.textContent));
    setAnchorElement(null);
  }, [language, currentLanguage]);

  const handleClose = useCallback(() => {
    setAnchorElement(null);
  }, []);

  return (
    <Box
      id="langSwitcher"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
        borderRight: "1px solid rgba(0, 0, 0, 0.2)"
      }}
    >
      <Button
        aria-controls={anchorElement ?? undefined}
        aria-haspopup="true"
        aria-expanded={anchorElement ? 'true' : undefined}
        onClick={onClickOpen}
      >
        {currentLanguage}
      </Button>
      <Menu
        anchorEl={anchorElement}
        open={!!anchorElement}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {LANGUAGES && LANGUAGES.map(
          (lang) => <MenuItem
            key={lang}
            onClick={onClickSetLanguage}
            value={lang}
            color="primary"
          >{lang}</MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default LangSwitcher;
