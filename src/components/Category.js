import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './Category.css';

const Category = ({ items, addToCart }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(<FaStar key={i} style={{ color: '#f5c518', marginRight: '2px' }} />);
      } else if (rating >= i + 0.5) {
        stars.push(<FaStarHalfAlt key={i} style={{ color: '#f5c518', marginRight: '2px' }} />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: '#f5c518', marginRight: '2px' }} />);
      }
    }
    return stars;
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)', // 4 cards per row on medium screens and up
        },
        gap: 3, // Space between cards
      }}
    >
      {items.map((item) => (
        <Card className="category-card">
        <CardMedia
          component="img"
          image={item.image}
          alt={item.name}
          className="category-card-img"
        />
        <CardContent className="category-card-content">
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">${item.price.toFixed(2)}</Typography>
          <Box className="category-card-stars">{renderStars(item.rating)}</Box>
          <Typography variant="body2">{item.description}</Typography>
          <Button size="small" color="inherit" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkgrey' } }}

            className="category-card-button"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
      
      ))}
    </Box>
  );
};

export default Category;
