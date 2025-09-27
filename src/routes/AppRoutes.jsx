// Centralized routing
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import CompetitiveProgrammer from '../pages/CompetitiveProgrammer/CompetitiveProgrammer';
import WebDeveloper from '../pages/WebDeveloper/WebDeveloper';
import Courses from '../pages/Courses/Courses';
import Portfolio from '../pages/Portfolio/Portfolio';
import Achievements from '../pages/Achievements/Achievements';
import Blog from '../pages/Blog/Blog';
import Contact from '../pages/Contact/Contact';
import PublicationsProducts from '../pages/PublicationsProducts/PublicationsProducts';

import AdminDashboard from '../admin/AdminDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/competitive-programmer" element={<CompetitiveProgrammer />} />
      <Route path="/web-developer" element={<WebDeveloper />} />
  <Route path="/courses" element={<Courses />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/publications-products" element={<PublicationsProducts />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
