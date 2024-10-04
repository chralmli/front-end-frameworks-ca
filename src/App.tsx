import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import ContactPage from './pages/ContactPage';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />

          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </CartProvider>

    </Router>
  );
};

export default App;
