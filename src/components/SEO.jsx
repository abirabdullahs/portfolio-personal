import React from 'react';
import { Helmet } from 'react-helmet';

// Example reusable SEO component using react-helmet
export default function SEO({ title, description, url, image, children }) {
  const pageTitle = title || 'Abir Hossen Abdullah — Competitive Programmer | Web Developer | Educator';
  const pageDesc = description || 'Portfolio of Abir Hossen Abdullah — Competitive Programmer, Web Developer, and Educator.';
  const pageUrl = url || 'https://abirabdullah.web.app/';
  const pageImage = image || `${pageUrl}personal.jpg`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content="Abir Hossen Abdullah, Competitive Programmer, Web Developer, Educator, portfolio" />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />

      {children}
    </Helmet>
  );
}
