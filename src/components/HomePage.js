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
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Card className="item" sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        ${item.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <Link to={`/${key}`}>
                      <Button size="small" color="inherit" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkgrey' } }}>
                        See More
                      </Button>
                    </Link>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Link to={`/${key}`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" className="see-more-button" sx={{ mt: 3, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkgrey' } }}>
                See More
              </Button>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default HomePage;