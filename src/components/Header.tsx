import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Cake, Home, Phone, ClipboardList } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import BakeryLogo from './BakeryLogo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Início", icon: <Home className="w-5 h-5" /> },
    { to: "/menu", label: "Cardápio", icon: <Cake className="w-5 h-5" /> },
    { to: "/orders", label: "Meus Pedidos", icon: <ClipboardList className="w-5 h-5" /> },
    { to: "/contact", label: "Contato", icon: <Phone className="w-5 h-5" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <BakeryLogo className="h-10 w-10 text-amber-700" />
            <span className="font-serif text-2xl font-bold text-amber-900">Padaria Artesanal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-1 text-lg font-medium transition-colors hover:text-amber-700 ${
                  location.pathname === link.to ? 'text-amber-700 font-semibold' : 'text-amber-900'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-2 rounded-full hover:bg-amber-100 transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-amber-800" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-amber-100 transition-colors md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-amber-800" />
              ) : (
                <Menu className="h-6 w-6 text-amber-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                    location.pathname === link.to ? 'bg-amber-100 text-amber-800' : 'text-amber-900 hover:bg-amber-50'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;