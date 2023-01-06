import React, {useContext, useState} from 'react'
import baseApi from '../axios';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deletePlaylist, getAllPlaylists, removeMediaFromPlaylist } from '../consts';
import { PlaylistCarousel } from '../components/MediaCard/Playlist/PlaylistCarousel';
import { DeletePlaylistPopup } from '../components/PopUps/DeletePlaylistPopup';
import { StoreContext } from '../storeContext';

const playlistContainer = {
  marginBottom: '25px',
  paddingTop: '25px',
  borderTop: '1px solid #e9e9e9',
};

const StyledTypography = styled(Typography)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',

  'svg': {
    width: '40px',
    height: 'auto',
    color: '#a81a1a',
    padding: '10px',
    borderRadius: '20px',
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#a81a1a',
      color: 'white',
    }
  }
}));

const StyledPlaylistContainer = styled('div')(playlistContainer);

export const PlaylistsPage = ({type}) => {
  const title = "My Playlists";
  const store = useContext(StoreContext);
  const user = store.username;
  const [search, setSearch] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);

  const filteredPlaylists = search !== ''
    ? playlists?.filter(playlist => playlist?.name?.includes(search))
    : playlists;

  const getAllPlaylistsQuery = useQuery({
    queryKey: ['getAllPlaylists'],
    queryFn: () => baseApi.get(getAllPlaylists, {}),
    onSuccess: async (data) => {
      console.log("SUCCESS: getPlaylists");
      if(data?.data?.playlists === null) setPlaylists([]);
      setPlaylists(data?.data?.playlists);
    },
    onError: async (error) => {
      console.log(error.message);
      setPlaylists([]);
    },
    enabled: !!user,
  });

  const deletePlaylistMutation = useMutation({
    mutationKey: ['deletePlaylist'],
    mutationFn: () => baseApi.delete(
      deletePlaylist, {
        data: {
          playlistName: playlistToDelete,
        },
      }),
    onSuccess: async (data) => {
      console.log(data?.data?.message);
      getAllPlaylistsQuery.refetch();
      handleDeletePlaylistPopupClose();
    },
    onError: async (error) => {
      console.log(error.message);
      handleDeletePlaylistPopupClose();
    },
    enabled: false,
  });

  const removeMediaMutation = useMutation({
    mutationKey: ['removeMediaFromPlaylist'],
    mutationFn: ([playlistName, mediaId]) => baseApi.delete(
      removeMediaFromPlaylist,
      {
        data: {
          playlistName: playlistName,
          mediaId: mediaId,
        },
      }),
    onSuccess: async (data) => {
      console.log(data);
      console.log("SUCCESS: removeMedia");
      getAllPlaylistsQuery.refetch();
    },
    onError: async (error) => console.log(error.message),
    enabled: false,
  });

  const showPlaylistsForSearch = filteredPlaylists && filteredPlaylists?.length > 0;
  const noPlaylists = !playlists || playlists?.length === 0;
  const noPlaylistsForSearch = !noPlaylists && !showPlaylistsForSearch;

  const handleDeletePlaylistPopupOpen = (name) => {
    setIsDeletePopupOpen(true);
    setPlaylistToDelete(name);
  } 
  const handleDeletePlaylistPopupClose = () => {
    setIsDeletePopupOpen(false);
    setPlaylistToDelete(null);
  } 

  return (
    <PageWrapper title={title}>
      <DeletePlaylistPopup
        open={isDeletePopupOpen}
        onClose={() => handleDeletePlaylistPopupClose()}
        deletePlaylist={deletePlaylistMutation}
      />
      <TextField
        id="outlined-basic"
        placeholder="Search by list name"
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
      {!getAllPlaylistsQuery.isLoading && (
        <>
          {noPlaylists && <div>{"There are no playlists"}</div>}
          {noPlaylistsForSearch && <div>{"There are no playlists that satisfy your search."}</div>}
          {showPlaylistsForSearch && (
            <>
              {filteredPlaylists?.map(playlist =>
                <StyledPlaylistContainer key={playlist?.name}>
                  <StyledTypography key={playlist?.name} variant="h5" color="text.primary" sx={{marginBottom: '25px'}}>
                    {playlist?.name}
                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleDeletePlaylistPopupOpen(playlist?.name)}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTypography> 
                  {playlist?.media_list?.length > 0
                    ? <PlaylistCarousel playlist={playlist} removeMedia={removeMediaMutation} />
                    : <Typography variant="h6" sx={{textAlign: 'center'}} color="text.primary">{"You did not add any media to this playlist yet!"}</Typography>
                  }
                </StyledPlaylistContainer>
              )}
            </>
          )}
        </>
      )}
    </PageWrapper>
  )
};
