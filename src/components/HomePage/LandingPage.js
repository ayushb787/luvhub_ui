import React from 'react';
import Navbar from './Navbar';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <section className="hero-section">
        <div className="hero-content">
          <h2>Welcome to LuvHub</h2>
          <p>Your perfect match is just a click away.</p>
          <a href="/sign-up" className="cta-button">Join Now</a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
