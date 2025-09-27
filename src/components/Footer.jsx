
const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/', icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.71.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.18 9.18 0 012.5-.34c.85 0 1.71.11 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z"/></svg>
  ) },
  { name: 'LinkedIn', href: 'https://linkedin.com/', icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.1-.9-2-2-2s-2 .9-2 2v5.5h-3v-10h3v1.5c.41-.77 1.36-1.5 2.5-1.5 1.93 0 3.5 1.57 3.5 3.5v6.5z"/></svg>
  ) },
  { name: 'Codeforces', href: 'https://codeforces.com/', icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#1f8acb"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff">CF</text></svg>
  ) },
  { name: 'LeetCode', href: 'https://leetcode.com/', icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#ffa116"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff">LC</text></svg>
  ) },
  { name: 'Medium', href: 'https://medium.com/', icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#02b875"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff">M</text></svg>
  ) },
  { name: 'YouTube', href: 'https://youtube.com/', icon: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#ff0000"/><polygon points="13,11 23,16 13,21" fill="#fff"/></svg>
  ) },
];

const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 py-6 border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="text-sm md:text-left w-full md:w-auto text-center">
          &copy; abir abdullah {year}
        </div>
        {/* Center */}
        <div className="flex space-x-4 w-full md:w-auto justify-center">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
        {/* Right */}
        <div className="flex space-x-4 w-full md:w-auto justify-center md:justify-end">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 text-sm transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
