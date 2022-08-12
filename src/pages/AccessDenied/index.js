import { useSelector } from 'react-redux';
import { Typography, Box, Paper } from '@mui/material';

import { getUserLang } from '../../redux/slices/userSlice/user.selectors';

import PageContainer from '../../components/PageContainer';

import i18l from '../../l18i.json';

const AccessDenied = () => {
  const language = useSelector(getUserLang);

  return (
    <PageContainer>
      <Box
        className="container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Paper
          sx={{
            textAlign: "center",
            p: 3
          }}
        >
          <Typography variant="h4">{i18l.pages.AccessDenied.title[language]}</Typography>
          <Typography variant="h6">{i18l.pages.AccessDenied.subtitle[language]}</Typography>
        </Paper>
      </Box>
    </PageContainer>
  );
};

export default AccessDenied;
