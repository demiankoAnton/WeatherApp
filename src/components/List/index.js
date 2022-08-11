import { memo, useCallback, useState } from 'react';
import { Paper, ListItemText, Typography, ListItemButton, ListItemIcon, List as MUIList } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const List = memo(({ items, title, onClickItem = () => {}, onClickDeleteItem = () => {} }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const onClickListItem = useCallback((event, item) => {
    onClickItem(event, item);
    setSelectedItem(item);
  }, [onClickItem]);

  const onClickDelete = useCallback((event, item) => {
    onClickDeleteItem(item);
  }, [onClickDeleteItem]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        p: 1,
        mb: 2,
        mt: 2,
        "& svg": {
          ml: "auto"
        }
      }}
    >
      {items.length ? (
        <>
          {title && (
            <Typography
              variant="h5"
              my={2}
              pl={2}
            >
              {title}
            </Typography>
          )}
          <MUIList
            component="nav"
            aria-label="main"
            sx={{p: 0}}
          >
            {items.map((item) => (
              <ListItemButton
                key={item.name}
                selected={selectedItem === item.id}
              >
                <ListItemText
                  primary={item.name}
                  onClick={(event) => onClickListItem(event, item.name)}
                />
                <ListItemIcon>
                  <DeleteForeverIcon
                    onClick={(event) => onClickDelete(event, item.name)}
                  />
                </ListItemIcon>
              </ListItemButton>
            ))}
          </MUIList>
        </>

      ) : (
        <Typography
          variant="h5"
          my={2}
          pl={2}
        >
          List is empty
        </Typography>
      )}
    </Paper>
  );
});

export default List;
