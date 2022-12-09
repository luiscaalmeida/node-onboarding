import React from 'react'
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import { MOVIE_TYPE, TVSERIE_TYPE } from '../consts';
import { SeeMostPopular } from '../components/SeeMostPopular/SeeMostPopular';
import { SeeMostPopularMedia } from '../components/SeeMostPopularMedia/SeeMostPopularMedia';

export const HomePage = () => {
  // const title = 'Home Page';

  return (
    <PageWrapper>
      <SeeMostPopularMedia type={MOVIE_TYPE} limit={5} align={'center'} showTitle />
      <SeeMostPopularMedia type={TVSERIE_TYPE} limit={5} align={'center'} showTitle />
      <SeeMostPopular />
    </PageWrapper>
  )
};
