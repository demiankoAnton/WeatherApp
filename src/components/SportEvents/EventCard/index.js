import {useCallback, useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography, CardContent, CardMedia, IconButton, CardActions } from '@mui/material';

import { addEventToFavorites, removeEventFromFavorites } from '../../../redux/slices/userSlice/user.slice';
import {
  getFavoriteEvents,
  getUserLang,
} from '../../../redux/slices/userSlice/user.selectors';

import FavoriteIcon from '@mui/icons-material/Favorite';

import i18l from '../../../l18i.json';

import style from './EventCard.module.scss';

const EventCard = memo(({ event, eventType }) => {
  const dispatch = useDispatch();
  const language = useSelector(getUserLang);
  const favoriteEvents = useSelector(getFavoriteEvents);
  const [isFavorite, setIsFavorite] = useState(false);

  const iconStyle = isFavorite ? {color: "#F3584E"} : null;

  useEffect(() => {
    for (const eventObject of favoriteEvents) {
      if (eventObject.match === event.match) {
        setIsFavorite(true);
      }
    }
  }, []);

  const onClickFavorite = useCallback(() => {
    if (!isFavorite) {
      setIsFavorite(true);
      dispatch(addEventToFavorites(event));
    } else {
      setIsFavorite(false);
      console.log(event);
      dispatch(removeEventFromFavorites(event.match));
    }
  }, [isFavorite]);

  return (
    <Card
      className={style.hoveredCard}
      variant="outlined"
      sx={{
      maxWidth: 275,
      m: 2,
      display: "flex",
      flexDirection: "column",
      flexBasis: "auto",
      flexGrow: 1,
      flexShrink: 1,
      opacity: 1
    }}>
      <CardMedia
        component="img"
        height="120"
        image={`https://loremflickr.com/275/120/${eventType}?t=${Math.random()}`}
        alt={event.tournament}
      />
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.disabled">
          <b>{i18l.components.EventCard.country[language]}:</b> {event.country}
        </Typography>
        <Typography sx={{ fontSize: 12, mb: 1.5 }} color="text.disabled">
          <b>{i18l.components.EventCard.tournament[language]}:</b> {event.tournament}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="primary.main">
          <b>{i18l.components.EventCard.match[language]}:</b> {event.match}
        </Typography>
        <Typography sx={{ fontSize: 12, mb: 1.5 }} color="info.main">
          <b>{i18l.components.EventCard.stadium[language]}:</b> {event.stadium}
        </Typography>
        <Typography sx={{ fontSize: 12}} color="success.main">
          <b>{i18l.components.EventCard.start[language]}Start at:</b> {event.start}
        </Typography>
      </CardContent>
      <CardActions sx={{borderTop: "1px solid rgba(0, 0, 0, 0.12)", mt: "auto"}}>
        <IconButton aria-label="add to favorites" onClick={onClickFavorite}>
          <FavoriteIcon sx={iconStyle} />
        </IconButton>
      </CardActions>
    </Card>
  );
});

export default EventCard;
