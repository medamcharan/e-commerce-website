import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const SERVER_URL = "https://aiserver-cge4.onrender.com";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/orders`)
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h2>Order ID: {order.id}</h2>
            <div className="order-details">
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-item-image"
                    />
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p>Price: ₹{item.price}</p>
                      <p>Size: {item.size}</p>
                      <p>Rating: {item.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-summary">
                <h3>Total Amount: ₹{order.totalAmount}</h3>
                <p>
                  Shipping Address: {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                </p>
                <p>Payment Method: {order.paymentMethod}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
