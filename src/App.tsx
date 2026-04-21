/**
 * EcoSmart - Main Application Component
 * 
 * Root component that sets up:
 * - React Router for navigation
 * - AppProvider for global state management
 * - Layout structure (Header, Main, Footer)
 * - Toast notifications and Cart sidebar
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Learn from './pages/Learn';
import About from './pages/About';
import Impact from './pages/Impact';
import Compare from './pages/Compare';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-eco-green focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>
          
          <Header />
          
          <main id="main-content" className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/about" element={<About />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          
          <Footer />
          
          <CartSidebar />
          <ToastContainer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
