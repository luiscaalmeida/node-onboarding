import React, {useState} from 'react'
import { InputAdornment, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';
import { LIST_FETCHERS, MOVIE_TYPE, SEARCH_FETCHERS } from '../consts';
import SearchIcon from '@mui/icons-material/Search';
import { axiosGet } from '../axios';
import { SeeMostPopularMedia } from '../components/SeeMostPopularMedia/SeeMostPopularMedia';
import { CustomHelmet } from '../components/CustomHelmet';

export const MediaListPage = ({type}) => {
  const title = type === MOVIE_TYPE ? 'Movies' : 'TV Series';

  const {key: list_key, func: list_func} = LIST_FETCHERS[type];
  const {isLoading: isListLoading, error: isListError, data: list_media} = useQuery(
    [list_key],
    () => axiosGet(list_func()),
  );
  
  const [search, setSearch] = useState('');
  const {key: search_key, func: search_func} = SEARCH_FETCHERS[type];
  const searchResults = useQuery(
    [search_key, search],
    () => fetch(search_func(search)).then(res => res.json()),
    {enabled: Boolean(search)},
  );
  // {structuralSharing: false, staleTime: Infinity}
  
  const shouldShowPopularMedia = !isListLoading && !isListError && list_media?.results?.length > 0;
  const shouldShowSearchResults = !searchResults.isLoading && !searchResults.isError && searchResults?.data?.results?.length > 0;
  const mediaToShow = shouldShowSearchResults ? searchResults?.data?.results : list_media?.results;

  return (
    <PageWrapper title={title}>
      <CustomHelmet
        title={title}
        description={`Listing all ${title} with a dynamic search bar`}
      />
      <TextField
        id="outlined-basic"
        placeholder="Search by name"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{marginBottom: '50px'}}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {(shouldShowSearchResults || shouldShowPopularMedia) && (
        <SeeMostPopularMedia type={type} limit={10} align={'left'} list={mediaToShow} showTitle={false} />
      )}
    </PageWrapper>
  )
};
