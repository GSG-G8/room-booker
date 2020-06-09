import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import NotFound from '../../assets/NotFound.jpg';
import './style.css';

const PageNotFound = () => (
  <div className="not-found-container">
    <img src={NotFound} alt="notFound" />
    <div>
      <h1>Page Not Found</h1>
      <p>
        We are sorry, the page you requested could not be found.
        <br /> Please go back to the HomePage
      </p>
      <Link to="/">
        <Button>HomePage</Button>
      </Link>
    </div>
  </div>
);

export default PageNotFound;
