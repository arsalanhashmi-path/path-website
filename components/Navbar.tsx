import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Founders', to: '/founders' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b bg-white border-gray-200 ${scrolled ? 'py-2' : 'py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center relative">
        {/* PATH Text - Left (Now a Link to Home) */}
        <Link 
          to="/" 
          className="text-2xl font-sans font-bold tracking-tighter text-black cursor-pointer select-none z-50 relative hover:opacity-70 transition-opacity"
        >
          <span>PATH</span>
        </Link>

        {/* Logo Symbol - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-sans font-bold tracking-tighter text-black cursor-pointer select-none z-50">
          <span>/ \</span>
        </div>

        {/* Desktop Menu - Right */}
        <ul className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.to ? (
                <Link
                  to={item.to}
                  className="text-sm font-medium text-gray-500 hover:text-black transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="text-sm font-medium text-gray-500 hover:text-black transition-colors duration-300"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-black focus:outline-none z-50 relative p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}>
          <ul className="flex flex-col gap-8 text-center">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.to ? (
                  <Link
                    to={item.to}
                    className="text-3xl font-bold text-black hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-3xl font-bold text-black hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};