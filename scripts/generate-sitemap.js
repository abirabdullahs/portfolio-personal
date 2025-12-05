// Node.js script to generate sitemap.xml for all static and dynamic pages

import fs from 'fs';
import path from 'path';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../src/firebase.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BASE_URL = 'https://abirabdullah.web.app';
const STATIC_ROUTES = [
  '/',
  '/about',
  '/portfolio',
  '/contact',
  '/blog',
  '/courses',
  '/competitive-programmer',
  '/web-developer',
  '/educator',
  '/achievements',
  '/publications-products',
];

async function getDynamicRoutes() {
  // Fetch dynamic IDs from Firestore
  const blogSnap = await getDocs(collection(db, 'blogs'));
  const courseSnap = await getDocs(collection(db, 'courses'));
  const productSnap = await getDocs(collection(db, 'productsPublications'));

  const blogRoutes = Array.from(blogSnap.docs).map(doc => `/blog/${doc.id}`);
  const courseRoutes = Array.from(courseSnap.docs).map(doc => `/courses/${doc.id}`);
  const productRoutes = Array.from(productSnap.docs).map(doc => `/publications-products/${doc.id}`);

  return [...blogRoutes, ...courseRoutes, ...productRoutes];
}

async function generateSitemap() {
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

  const urlset = allRoutes.map(route => `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;

  const __dirname = path.resolve();
  fs.writeFileSync(path.join(__dirname, 'public/sitemap.xml'), sitemap, 'utf8');
  console.log('Sitemap generated with', allRoutes.length, 'routes.');
}

generateSitemap();
