import AccountCircle from '@mui/icons-material/AccountCircle';
import { Grid, InputAdornment, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, {useState} from 'react'
import { MediaCardOverview } from '../components/MediaCard/MediaCardOverview';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';
import { LIST_FETCHERS, MOVIE_TYPE, SEARCH_FETCHERS } from '../consts';
import { useFetch } from '../hooks/useFetch';
import SearchIcon from '@mui/icons-material/Search';

export const MediaListPage = ({type}) => {
  const title = type === MOVIE_TYPE ? 'Movies' : 'TV Series';

  const {key: list_key, func: list_func} = LIST_FETCHERS[type];
  const {isLoading: isListLoading, error: isListError, data: list_media} = useFetch(list_key, list_func());
  
  const [search, setSearch] = useState('');
  const {key: search_key, func: search_func} = SEARCH_FETCHERS[type];
  
  const query = useQuery(
    [search_key, search],
    () => fetch(search_func(search)).then(res => res.json()),
    {enabled: Boolean(search)},
  );
  
  const shouldShowPopularMedia = !isListLoading && !isListError && list_media?.results?.length > 0;
  const shouldShowSearchResults = !query.isLoading && !query.isError && query?.data?.results?.length > 0;
  
  // useEffect(() => {
  //   console.log(`Popular: ${shouldShowPopularMedia}`)
  //   console.log(`Search: ${shouldShowSearchResults}`)
  // }, [shouldShowPopularMedia, shouldShowSearchResults]);

  // const mediaToShow = shouldShowSearchResults && query?.data?.results;
  const mediaToShow = shouldShowSearchResults ? query?.data?.results : list_media?.results;

  return (
    <PageWrapper title={title}>
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
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {(shouldShowSearchResults || shouldShowPopularMedia) && (
        <Grid container spacing={0.5}>
        {mediaToShow.map(media => (
          <MediaCardOverview
            key={media?.id}
            title={type === MOVIE_TYPE ? media?.title : media?.name}
            imageUrl={media?.poster_path ? `https://image.tmdb.org/t/p/w500/${media?.poster_path}` : null}
            mediaUrl={`/${type}/${media?.id}`}
            overview={media?.overview}
          />
        ))}
        </Grid>
      )}
    </PageWrapper>
  )
};
