import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  // Services dropdown will be handled separately
  { name: 'Courses', href: '/courses' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'Publications', href: '/publications-products' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const servicesItems = [
  { name: 'Competitive Programming', href: '/competitive-programmer' },
  { name: 'Web Development', href: '/web-developer' },
  { name: 'Educator', href: '/Educator' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow fixed w-full z-50">
      {/* First Line: Logo + Search + Explore */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">abirabdullah</a>
          </div>

          {/* Desktop: Search + Explore */}
          <div className="hidden md:flex items-center space-x-3 flex-1 justify-end">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg hover:opacity-90 transition font-semibold">
              Explore
            </button>
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Second Line: Menu Items (desktop) */}
      <div className="hidden md:flex bg-white dark:bg-gray-900 py-1 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center w-full">
            {/* Main menu items except services */}
            <div className="flex space-x-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-gray-700 text-center dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 dark:hover:bg-gray-800 transition ${isActive ? 'bg-blue-600 text-white dark:bg-blue-500' : ''}`}
                  >
                    {item.name}
                  </a>
                );
              })}
              {/* Services dropdown */}
              <div className="relative group">
                <button
                  className="text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 dark:hover:bg-gray-800 transition focus:outline-none"
                >
                  Services
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 z-10 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto">
                  {servicesItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-md text-sm transition`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Sidebar */}
      <div className={`md:hidden fixed inset-0 z-50 ${mobileOpen ? '' : 'pointer-events-none'}`}> 
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />
        {/* Sidebar */}
        <aside className={`absolute top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          <button
            className="self-end m-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="px-6 pt-2 pb-3 space-y-1 flex-1 overflow-y-auto">
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
            {/* Services dropdown for mobile */}
            <div className="mt-2">
              <details>
                <summary className="block text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 dark:hover:bg-gray-800 transition cursor-pointer select-none">Services</summary>
                <div className="pl-4">
                  {servicesItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-md text-base transition"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </details>
            </div>
            {/* Mobile: Search + Explore */}
            <div className="mt-3 flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg hover:opacity-90 transition font-semibold w-full">
                Explore
              </button>
            </div>
          </div>
        </aside>
      </div>
    </nav>
  );
}
