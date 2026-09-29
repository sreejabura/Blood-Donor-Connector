import React, { useState } from 'react';
import DonorSuggestions from './DonorSuggestions';
import DonorDetail from './DonorDetail';

const RecipientTab = ({ donors }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    bloodGroup: ''
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    const { location, bloodGroup } = searchParams;


  };

  if (selectedDonor) {
    return <DonorDetail donor={selectedDonor} onBack={() => setSelectedDonor(null)} />;
  }

  return (
    <div className="recipient-container">
      <div className="glass-panel" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Find Nearby Donors</h2>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '2', minWidth: '250px', marginBottom: 0 }}>
            <label className="form-label">Your Location</label>
            <input 
              required
              type="text" 
              className="form-input" 
              placeholder="Enter city" 
              value={searchParams.location}
              onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
            />
          </div>
          <div className="form-group" style={{ flex: '1', minWidth: '150px', marginBottom: 0 }}>
            <label className="form-label">Required Blood Group</label>
            <select 
              className="form-select"
              value={searchParams.bloodGroup}
              onChange={(e) => setSearchParams({...searchParams, bloodGroup: e.target.value})}
            >
              <option value="">Any Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" style={{ height: '54px', minWidth: '150px' }}>
            Search Now
          </button>
        </form>
      </div>

      {hasSearched ? (
        <div className="search-results animation-fade-in" style={{ animation: 'fadeIn 0.5s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.8rem' }}>
              Results for <span style={{ color: 'var(--primary-red)' }}>{searchParams.bloodGroup || 'Any Blood Type'}</span> in {searchParams.location}
            </h3>
            <span style={{ color: '#aaa' }}>Showing matching nearby donors</span>
          </div>
          <DonorSuggestions 
            donors={donors} 
            limit={6} 
            filterBloodType={searchParams.bloodGroup} 
            filterLocation={searchParams.location} 
            onSelectDonor={setSelectedDonor}
          />
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px dashed var(--glass-border)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📍</div>
          <p>Enter your location and required blood type to find heroes near you.</p>
        </div>
      )}
    </div>
  );
};

export default RecipientTab;
