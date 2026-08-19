import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import { notFoundPage } from '../../constants/uiClasses';

const NotFound = () => {
  return (
    <div className={notFoundPage}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">
        <Button variant="primary">Go Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
