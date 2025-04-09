import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, InputBase, Badge, Avatar, Box, Menu, MenuItem } from '@mui/material';
import { Search, LightMode, DarkMode, Logout, Home, ShoppingCart } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

// Styled components
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
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    marginLeft: theme.spacing(3),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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
  margin: theme.spacing(0, 1),
  display: 'flex',
  alignItems: 'center',
}));

// Header component
const Header = ({ onSearch, cartItemCount, userEmail, theme, toggleTheme }) => {
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load the theme from localStorage when the component mounts
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      toggleTheme(savedTheme);
    }
  }, []);

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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme); // Save theme to localStorage
    toggleTheme(newTheme);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Left Side */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Avatar sx={{ bgcolor: 'black', mr: 1 }}>V</Avatar>
          <Typography variant="h6" component="div">
            Vouge
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
              margin: '0 8px',
              fontSize: '0.875rem',
              textDecoration: 'none',
              color: 'inherit',
              textAlign: 'center',
            },
            '@media (min-width:600px)': {
              '& a': {
                margin: '0 16px',
              },
            },
          }}
        >
          <Link to="/" title="Home">
            <Home />
          </Link>
          <Link to="/women" title="Women">
            Women
          </Link>
          <Link to="/men" title="Men">
            Men
          </Link>
          <Link to="/kids" title="Kids">
            Kids
          </Link>
          <Link to="/accessories" title="Accessories">
            Accessories
          </Link>
          {/* Add Orders Link */}
          <Link to="/orders" title="Orders">
            Orders
          </Link>
        </Box>
        {/* Right Side: Cart, Search, Theme Toggle, Logout, and Account Menu */}
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
          <ClickableIcon onClick={handleThemeChange} title="Toggle Theme">
            {theme === 'light' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </ClickableIcon>
          {/* Account Dropdown Menu */}
          {userEmail ? (
            <>
              <ClickableIcon onClick={handleMenuClick}>
                <Avatar sx={{ bgcolor: 'gray', cursor: 'pointer' }}>
                  {userEmail.charAt(0).toUpperCase()}
                </Avatar>
              </ClickableIcon>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>
                  <Typography>{userEmail}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout fontSize="small" sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/login">
              <ClickableIcon title="Login">
                <Logout fontSize="small" />
              </ClickableIcon>
            </Link>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
