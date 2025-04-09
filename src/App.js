import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Category from './components/Category';
import ItemDetails from './components/ItemDetails';
import Cart from './components/Cart';
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Chatbot from './components/Chatbot';
import OrdersPage from './components/OrdersPage'; 
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('light');
  const [categories, setCategories] = useState({
    accessories: [],
    kids: [],
    men: [],
    women: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accessoriesRes, kidsRes, menRes, womenRes] = await Promise.all([
          fetch('/data/accessories.json').then((res) => res.json()),
          fetch('/data/kids-wear.json').then((res) => res.json()),
          fetch('/data/men-wear.json').then((res) => res.json()),
          fetch('/data/women-wear.json').then((res) => res.json()),
        ]);

        setCategories({
          accessories: accessoriesRes,
          kids: kidsRes,
          men: menRes,
          women: womenRes,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filterItems = (items) => {
    return items.filter(item => item.name.toLowerCase().includes(searchQuery));
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  const isRegistered = localStorage.getItem('registered') === 'true';

  const ProtectedRoute = ({ children }) => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      if (!isRegistered) return <Navigate to="/register" />;
      if (!isAuthenticated) return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated || isRegistered ? <Navigate to="/" /> : <Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Header
                  toggleTheme={toggleTheme}
                  theme={theme}
                  onSearch={handleSearch}
                  cartItemCount={cartItemCount}
                />
                <Chatbot />
                <Routes>
                  <Route path="/chat" element={<Chatbot />} />
                  <Route path="/" element={<HomePage categories={categories} searchQuery={searchQuery} onAddToCart={addToCart} />} />
                  <Route path="/women" element={<Category items={filterItems(categories.women)} addToCart={addToCart} />} />
                  <Route path="/men" element={<Category items={filterItems(categories.men)} addToCart={addToCart} />} />
                  <Route path="/kids" element={<Category items={filterItems(categories.kids)} addToCart={addToCart} />} />
                  <Route path="/accessories" element={<Category items={filterItems(categories.accessories)} addToCart={addToCart} />} />
                  <Route path="/details/:category/:id" element={<ItemDetails categories={categories} />} />
                  <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                  <Route path="/search" element={<SearchResults searchQuery={searchQuery} filterItems={filterItems} />} />
                  <Route path="/orders" element={<OrdersPage />} /> {/* Add OrdersPage route */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
