import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main style={{ marginLeft: '25%', textAlign: 'center' }}>
      <p style={{ color: 'black' }}>There's nothing here!</p>
      <Link to="/" style={{ color: 'black', textDecoration: 'underline' }}>
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;