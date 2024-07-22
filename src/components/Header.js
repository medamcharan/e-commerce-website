import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, InputBase, Badge, Avatar, Box } from '@mui/material';
import { Search, LightMode, DarkMode, Logout, Home, ShoppingCart } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create(['background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
}));

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(25),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(6),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ClickableIcon = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  margin: theme.spacing(0, 2),
  display: 'flex',
  alignItems: 'center',
}));

const Header = ({ onSearch, cartItemCount, userEmail, theme, toggleTheme }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('registered');
    navigate('/login');
  };

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Left Side */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Avatar sx={{ bgcolor: 'black', mr: 0 }}>V</Avatar>
          <Typography variant="h6" component="div">
            ouge
          </Typography>
        </Box>
        {/* Center: Category Links */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& a': {
              margin: '0 16px',
            },
            '@media (min-width:600px)': {
              '& a': {
                margin: '0 24px',
              },
            },
          }}
        >
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Home />
          </Link>
          <Link to="/women" style={{ color: 'inherit', textDecoration: 'none' }}>
            Women
          </Link>
          <Link to="/men" style={{ color: 'inherit', textDecoration: 'none' }}>
            Men
          </Link>
          <Link to="/kids" style={{ color: 'inherit', textDecoration: 'none' }}>
            Kids
          </Link>
          <Link to="/accessories" style={{ color: 'inherit', textDecoration: 'none' }}>
            Accessories
          </Link>
        </Box>
        {/* Right Side: Cart, Search, Theme Toggle, Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/cart" style={{ color: 'inherit', textDecoration: 'none', margin: '0 8px' }}>
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCart />
            </Badge>
          </Link>
          <SearchBar>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={search}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchBar>
          <ClickableIcon onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </ClickableIcon>
          <ClickableIcon onClick={handleLogout} title={userEmail || 'Logout'}>
            <Logout fontSize="small" />
          </ClickableIcon>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
