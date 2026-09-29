import React, { useState } from 'react';
import DonorSuggestions from './DonorSuggestions';
import DonorDetail from './DonorDetail';

const Home = ({ setActiveTab, donors, isRegisteredDonor }) => {
  const [selectedDonor, setSelectedDonor] = useState(null);

  if (selectedDonor) {
    return <DonorDetail donor={selectedDonor} onBack={() => setSelectedDonor(null)} />;
  }

  return (
    <div className="home-container" style={{ animation: 'fadeIn 0.8s ease forwards' }}>
      <div className="hero-section" style={{ textAlign: 'center', margin: '4rem 0', padding: '2rem' }}>
        <h1 className="hero-title">Every Drop Counts,<br/>Become a Hero Today.</h1>
        <p className="hero-subtitle" style={{ margin: '1rem auto 3rem auto' }}>
          Connect with local blood donors in real-time or register to save a life in your community.
          Our network ensures that recipients find perfect matches quickly and safely.
        </p>
        
        <div className="hero-actions" style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {!isRegisteredDonor && (
            <button className="btn-primary" onClick={() => setActiveTab('donor')}>
              Register as Donor
            </button>
          )}
          <button className="btn-outline" onClick={() => setActiveTab('recipient')}>
            Find a Donor
          </button>
        </div>
      </div>

      <div className="suggestions-section" style={{ marginTop: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', color: 'var(--white)' }}>Recent Donors Near You</h2>
            <p style={{ color: '#aaa', marginTop: '0.5rem' }}>A few heroes ready to help in your area.</p>
          </div>
          <button className="btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }} onClick={() => setActiveTab('recipient')}>
            View All Donors
          </button>
        </div>
        
        <DonorSuggestions donors={donors} limit={3} onSelectDonor={setSelectedDonor} />
      </div>
    </div>
  );
};

export default Home;
