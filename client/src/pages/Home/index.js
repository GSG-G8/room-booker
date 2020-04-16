import React from 'react';
import Calendar from '../../components/DayView/Calendar';
import './style.css';
import Nav from '../../components/Navbar';

const Home = () => (
  <div className="Home">
    <Nav />
    <Calendar />
  </div>
);

export default Home;
