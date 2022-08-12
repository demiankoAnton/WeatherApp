import {
  Card,
  CardActions,
  CardContent,
  CardMedia, IconButton, Skeleton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const EventSkeleton = () => {
  return (
    <Card
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

      <Skeleton sx={{ height: 120 }} animation="wave" variant="rectangular" />

      <Skeleton
        animation="wave"
        height={15}
        width="60%"
        style={{
          marginTop: 15,
          marginLeft: 15
        }}
      />

      <Skeleton
        animation="wave"
        height={15}
        width="70%"
        style={{
          marginBottom: 15,
          marginLeft: 15
        }}
      />

      <Skeleton
        animation="wave"
        height={17}
        width="80%"
        style={{
          marginBottom: 2,
          marginLeft: 15
        }}
      />

      <Skeleton
        animation="wave"
        height={17}
        width="70%"
        style={{
          marginBottom: 15,
          marginLeft: 15
        }}
      />

      <Skeleton
        animation="wave"
        height={12}
        width="70%"
        style={{
          marginBottom: 30,
          marginLeft: 15
        }}
      />

      <Skeleton
        variant="circular"
        width={30}
        height={30}
        style={{
          marginLeft: 15,
          marginBottom: 15
        }}
      />
    </Card>
  );
};

export default EventSkeleton;
