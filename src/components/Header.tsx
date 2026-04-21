import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShoppingCartIcon, 
  Bars3Icon, 
  XMarkIcon,
  ScaleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const { toggleCart, cartItemCount, state } = useApp();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setUserName('');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as { fullName?: string };
      setUserName(parsedUser.fullName ?? '');
    } catch {
      localStorage.removeItem('user');
      setUserName('');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserName('');
    setIsMenuOpen(false);
  };
  
  const isActive = (path: string) => location.pathname === path;
  
const navLink = (path: string) => `
    text-gray-700 hover:text-eco-green transition-colors font-medium
    ${isActive(path) ? 'text-eco-green border-b-2 border-eco-green' : ''}
  `;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-eco-green focus:ring-offset-2 rounded-lg"
            aria-label="EcoSmart Home"
          >
            <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg" aria-hidden="true">♻</span>
            </div>
            <span className="text-2xl font-bold text-eco-green hidden sm:inline">EcoSmart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <Link to="/" className={navLink('/')}>
              Home
            </Link>
            <Link to="/products" className={navLink('/products')}>
              Shop
            </Link>
            <Link to="/learn" className={navLink('/learn')}>
              Learn
            </Link>
            <Link to="/impact" className={navLink('/impact')}>
              <span className="flex items-center gap-1">
                <SparklesIcon className="w-4 h-4" />
                My Impact
              </span>
            </Link>
            <Link to="/about" className={navLink('/about')}>
              About
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            {/* Auth Links */}
            {userName ? (
              <>
                <span className="hidden md:inline-block px-2 py-2 text-sm text-gray-700">
                  Hi, {userName}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden md:inline-block px-4 py-2 text-eco-green font-semibold hover:bg-eco-cream rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:inline-block px-4 py-2 text-eco-green font-semibold hover:bg-eco-cream rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hidden md:inline-block px-4 py-2 bg-eco-green text-white font-semibold hover:bg-eco-dark rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
            
            {/* Compare Button */}
            {state.compareList.length > 0 && (
              <Link
                to="/compare"
                className="relative p-2 text-gray-700 hover:text-eco-green transition-colors focus:outline-none focus:ring-2 focus:ring-eco-green rounded-full"
                aria-label={`Compare ${state.compareList.length} products`}
              >
                <ScaleIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {state.compareList.length}
                </span>
              </Link>
            )}
            
            {/* Cart Button */}
            <button 
              onClick={() => toggleCart(true)}
              className="relative p-2 text-gray-700 hover:text-eco-green transition-colors focus:outline-none focus:ring-2 focus:ring-eco-green rounded-full"
              aria-label={`Shopping cart with ${cartItemCount} items`}
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span 
                className={`absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold transition-colors ${
                  cartItemCount > 0 ? 'bg-eco-green' : 'bg-gray-400'
                }`}
              >
                {cartItemCount}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-eco-green transition-colors focus:outline-none focus:ring-2 focus:ring-eco-green rounded-full"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav 
            id="mobile-menu"
            className="md:hidden pb-4 space-y-2 border-t border-gray-100 pt-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <Link
              to="/"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'bg-eco-cream text-eco-green font-semibold' : 'text-gray-700 hover:bg-eco-cream'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/products') ? 'bg-eco-cream text-eco-green font-semibold' : 'text-gray-700 hover:bg-eco-cream'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/learn"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/learn') ? 'bg-eco-cream text-eco-green font-semibold' : 'text-gray-700 hover:bg-eco-cream'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Learn
            </Link>
            <Link
              to="/impact"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/impact') ? 'bg-eco-cream text-eco-green font-semibold' : 'text-gray-700 hover:bg-eco-cream'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" />
                My Impact
              </span>
            </Link>
            <Link
              to="/about"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive('/about') ? 'bg-eco-cream text-eco-green font-semibold' : 'text-gray-700 hover:bg-eco-cream'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {userName ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-700">
                  Signed in as {userName}
                </div>
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2 rounded-lg transition-colors text-gray-700 hover:bg-eco-cream"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/login') ? 'bg-eco-cream text-eco-green font-semibold' : 'text-gray-700 hover:bg-eco-cream'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive('/signup') ? 'bg-eco-cream text-eco-green font-semibold' : 'text-gray-700 hover:bg-eco-cream'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
            {state.compareList.length > 0 && (
              <Link
                to="/compare"
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive('/compare') ? 'bg-eco-cream text-eco-green font-semibold' : 'text-gray-700 hover:bg-eco-cream'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <ScaleIcon className="w-4 h-4" />
                  Compare ({state.compareList.length})
                </span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
