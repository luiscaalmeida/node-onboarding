import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { StoreContext } from '../../storeContext';

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const store = useContext(StoreContext);
  const isUserAuthenticated = store.username;
  const title = 'IMDB.v2';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button variant='text' style={{color: "white"}} to={'/'} component={Link}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </Button>
          <div style={{marginLeft: "auto"}}>
            {isUserAuthenticated ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  sx={{borderRadius: '12px'}}
                >
                  <Typography sx={{marginRight: '10px'}} variant="h6">{isUserAuthenticated}</Typography>
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/profile/info" onClick={handleClose}>
                    Update Personal Information
                  </MenuItem>
                  <MenuItem component={Link} to="/profile/password" onClick={handleClose}>
                    Update Password
                  </MenuItem>
                  <MenuItem component={Link} to="/profile/picture" onClick={handleClose}>
                    Update Profile Picture
                  </MenuItem>
                  <MenuItem component={Link} to="/playlists" onClick={handleClose}>
                    Playlists
                  </MenuItem>
                  <MenuItem component={Link} to="/logout" onClick={handleClose}>
                    Log Out
                  </MenuItem>
                </Menu>
              </>  
            )
            : (
              <>
                <Button variant='text' style={{color: "white"}} to={'/register'} component={Link}>
                  Sign Up
                </Button>
                <Button variant='text' style={{color: "white"}} to={"/login"} component={Link}>
                  Login
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
