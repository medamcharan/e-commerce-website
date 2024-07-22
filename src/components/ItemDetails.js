import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const ItemDetails = ({ categories }) => {
  const { category, id } = useParams();
  const item = categories[category]?.find((item) => item.id === parseInt(id));

  if (!item) {
    return <p>Item not found</p>;
  }

  return (
    <Box 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      <Card 
        sx={{ 
          maxWidth: { xs: '100%', sm: 600 }, 
          mx: 'auto', 
          boxShadow: 3, 
          borderRadius: 2 
        }}
      >
        <CardMedia
          component="img"
          height="auto"
          image={item.image}
          alt={item.name}
          sx={{ 
            width: '100%', 
            height: { xs: 300, sm: 400 }, 
            objectFit: 'cover' 
          }}
        />
        <CardContent>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              mb: 2, 
              fontSize: { xs: '1.5rem', sm: '2rem' } 
            }}
          >
            {item.name}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 2, 
              fontSize: { xs: '0.875rem', sm: '1rem' } 
            }}
          >
            {item.description}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.primary" 
            sx={{ 
              mb: 2, 
              fontSize: { xs: '0.875rem', sm: '1rem' } 
            }}
          >
            Size: {item.size}
          </Typography>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem' } 
            }}
          >
            ${item.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ItemDetails;
