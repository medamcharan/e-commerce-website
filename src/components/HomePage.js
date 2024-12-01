import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box, Grid } from '@mui/material';
import './HomePage.css'; // Ensure you import the CSS file

const HomePage = ({ categories, searchQuery }) => {
  const filterItems = (items) => {
    return items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <Box className="home-page">
      {/* Promotional Section */}
      <Box className="promo-section" sx={{ p: { xs: 3, md: 10 }, textAlign: { xs: 'center', md: 'left' } }}>
        <Box className="promo-content" sx={{ maxWidth: 800, mx: { xs: 'auto', md: 0 }, px: { xs: 2, md: 0 } }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 2 }}>
            Get Started
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, mb: 2 }}>
            Your Favorite Shopping
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, mb: 2 }}>
            Get up to 10% off
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, mb: 3 }}>
            Shop Now.....!
          </Typography>
        </Box>
      </Box>

      {/* Categories Section */}
      {Object.keys(categories).map((key) => {
        const filteredItems = filterItems(categories[key]);
        if (filteredItems.length === 0) return null; // Skip category if no items

        return (
          <Box key={key} className="category-section" sx={{ mb: 5 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Typography>
            <Grid container spacing={2}>
              {filteredItems.slice(0, 4).map((item) => (
                <Grid item xs={6} sm={6} md={3} key={item.id}>
                 <Card className="card" sx={{ height: '100%' }}>
  <CardMedia
    component="img"
    className="card-media"
    image={item.image}
    alt={item.name}
  />
  <CardContent className="item-content">
    <Typography gutterBottom variant="h5" component="div">
      {item.name}
    </Typography>
    <Typography variant="body1" color='#666'>
      ${item.price.toFixed(2)}
    </Typography>
    <Typography variant="body2" color="#666" sx={{ mt: 1 }}>
      {item.description}
    </Typography>
  </CardContent>
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
    <Link to={`/${key}`} style={{ textDecoration: 'none' }}>
      <Button
        size="small"
        color="inherit"
        sx={{
          backgroundColor: 'black',
          color: 'white',
          '&:hover': { backgroundColor: 'darkgrey' },
        }}
      >
        See More
      </Button>
    </Link>
  </Box>
</Card>

                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default HomePage;
