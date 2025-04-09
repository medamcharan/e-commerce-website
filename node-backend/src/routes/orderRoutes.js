// routes/orderRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to the orders file
const ordersFilePath = path.join(__dirname, '..', 'orders.json');

// Endpoint to get all orders
router.get('/', (req, res) => {
  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read orders file' });
    }
    const orders = data ? JSON.parse(data) : [];
    res.json({ orders });
  });
});

// Endpoint to get order by ID
router.get('/:id', (req, res) => {
  const orderId = parseInt(req.params.id, 10); // Extract the order ID from the URL parameter

  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read orders file' });
    }
    
    const orders = data ? JSON.parse(data) : [];
    const order = orders.find(o => o.id === orderId); // Find the order by ID
    
    if (order) {
      return res.json(order); // Send the order details if found
    } else {
      return res.status(404).json({ error: 'Order not found' }); // Return 404 if not found
    }
  });
});

// Endpoint to create a new order (POST request)
router.post('/', (req, res) => {
  const newOrder = req.body;

  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ error: 'Failed to read orders file' });
    }

    const orders = data ? JSON.parse(data) : [];
    newOrder.id = orders.length ? orders[orders.length - 1].id + 1 : 1; // Generate a new ID for the order
    orders.push(newOrder);

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save the order' });
      }
      res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    });
  });
});

module.exports = router;
