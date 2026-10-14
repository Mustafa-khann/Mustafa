import React, { useEffect } from 'react';

const ExternalRedirect = ({ to }) => {
  useEffect(() => {
    window.location.replace(`${to}${window.location.search}${window.location.hash}`);
  }, [to]);

  return (
    <main className="site-main empty-page">
      <h1>Opening the page…</h1>
      <a className="text-link" href={to}>Continue ↗</a>
    </main>
  );
};

export default ExternalRedirect;
