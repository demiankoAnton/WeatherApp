import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';

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
          height: "100%"
        }}
      >
        <Box py={5} textAlign="center">
          <Typography variant="h4">{i18l.pages.AccessDenied.title[language]}</Typography>
          <Typography variant="h6">{i18l.pages.AccessDenied.subtitle[language]}</Typography>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default AccessDenied;
