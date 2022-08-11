import {useSelector} from 'react-redux';

import {getUserLang} from '../../redux/slices/userSlice/user.selectors';

import PageContainer from '../../components/PageContainer';

import i18l from '../../l18i.json';

import styles from './PageNotFound.module.scss';
import { Box } from '@mui/material';

const PageNotFound = () => {
  const language = useSelector(getUserLang);

  return (
    <PageContainer>
      <Box
        className="container"
        sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%"
      }}>
        <div className={styles.pageNotFound}>
          <h2>{i18l.pages.notFound.title[language]}</h2>
          <h4>{i18l.pages.notFound.subtitle[language]}</h4>
        </div>
      </Box>
    </PageContainer>
  );
}

export default PageNotFound;
