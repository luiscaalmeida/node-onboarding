import React from 'react'
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import { MOVIE_TYPE, TVSERIE_TYPE } from '../consts';
import { SeeMostPopular } from '../components/SeeMostPopular/SeeMostPopular';
import { SeeMostPopularMedia } from '../components/SeeMostPopularMedia/SeeMostPopularMedia';
import { CustomHelmet } from '../components/CustomHelmet';

export const HomePage = () => {
  const title = 'Home Page';

  return (
    <PageWrapper>
      <CustomHelmet
        title={title}
        description={"Home Page with Movie and TV Series top 5"}
      />
      <SeeMostPopularMedia type={MOVIE_TYPE} limit={5} align={'center'} showTitle />
      <SeeMostPopularMedia type={TVSERIE_TYPE} limit={5} align={'center'} showTitle />
      <SeeMostPopular />
    </PageWrapper>
  )
};
