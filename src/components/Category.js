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
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
        gap: 2,
      }}
    >
      {items.map((item) => (
        <Card
          key={item.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 0,
            boxShadow: 3,
            overflow: 'hidden',
            width: '100%',
            height: '100%', // Ensuring cards take full height available
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
            },
          }}
        >
          <CardMedia
            component="img"
            height="auto"
            image={item.image}
            alt={item.name}
            sx={{ objectFit: 'cover', height: { xs: '400px', sm: '450px', md: '500px' } }} // Responsive image heights
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} // Responsive font size
            >
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }} // Responsive font size
            >
              ${item.price.toFixed(2)}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                my: 1,
                fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive font size for stars
              }}
            >
              {renderStars(item.rating)}
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }} // Responsive font size
            >
              {item.description}
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': { bgcolor: 'darkgrey' },
                fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Responsive font size
                padding: { xs: '0.5rem', sm: '0.75rem' }, // Responsive padding
              }}
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
