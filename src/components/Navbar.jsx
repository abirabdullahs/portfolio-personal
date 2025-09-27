// Navbar component

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Competitive Programming', href: '/competitive-programmer' },
  { name: 'Web Development', href: '/web-developer' },
  { name: 'Courses', href: '/courses' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'Publications & Products', href: '/publications-products' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Removed darkMode state
  const location = useLocation();

  // Toggle dark mode (for demo, just toggles a class on body)
    // Removed handleDarkMode function

  return (
    <nav className="bg-white dark:bg-gray-900 shadow fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-2">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center flex-grow">
            <a href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">abirabdullah</a>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 dark:hover:bg-gray-800 transition ${isActive ? 'bg-blue-600 text-white dark:bg-blue-500' : ''}`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
          {/* Right Side */}
          <div className="flex items-center space-x-2">
            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Open menu"
            >
              <svg className="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 ${mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'} overflow-y-auto`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`block text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 dark:hover:bg-gray-800 transition ${isActive ? 'bg-blue-600 text-white dark:bg-blue-500' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </a>
            );
          })}
          {/* Removed Resume and dark/light mode from mobile menu */}
        </div>
      </div>
    </nav>
  );
}
