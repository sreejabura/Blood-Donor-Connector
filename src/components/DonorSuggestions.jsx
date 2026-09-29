import React from 'react';
import { getDonorBadge } from '../utils/badges';

const DonorSuggestions = ({ donors = [], limit, filterBloodType = '', filterLocation = '', onSelectDonor }) => {
  
  let displayedDonors = donors;
  
  if (filterBloodType) {
    displayedDonors = displayedDonors.filter(d => d.bloodGroup === filterBloodType);
  }

  if (filterLocation) {
    displayedDonors = displayedDonors.filter(d => d.location.toLowerCase().includes(filterLocation.toLowerCase()));
  }
  
  if (limit) {
    displayedDonors = displayedDonors.slice(0, limit);
  }

  if (displayedDonors.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(230, 57, 70, 0.05)', borderRadius: '12px' }}>
        <p style={{ color: '#aaa' }}>No exact matches found. Please try expanding your search.</p>
      </div>
    );
  }

  return (
    <div className="donor-grid">
      {displayedDonors.map((donor) => (
        <div key={donor.id} className="donor-card" onClick={() => onSelectDonor && onSelectDonor(donor)} style={{ cursor: onSelectDonor ? 'pointer' : 'default' }}>
          <div className="donor-header">
            <div className="blood-group-badge">{donor.bloodGroup}</div>
            <div style={{ color: '#aaa', fontSize: '0.85rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
              📍 {donor.landmark}
            </div>
          </div>
          
          <div className="donor-details">
            <h3 className="donor-name" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {donor.name}
              {getDonorBadge(donor.donationsCount) && (
                <span title={`${donor.donationsCount} Lives Saved!`} style={{ fontSize: '1rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {getDonorBadge(donor.donationsCount).icon}
                </span>
              )}
            </h3>
            <div className="donor-info">
              <span>🏥 {donor.location}</span>
            </div>
            <div className="donor-info" style={{ color: 'var(--primary-red)' }}>
              <span>⏱️ Last donated: {donor.lastDonated || "Ready to donate"}</span>
            </div>
          </div>
          
          <div className="donor-action" style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-primary" style={{ flex: 1 }} onClick={(e) => {
              if(onSelectDonor) {
                e.stopPropagation();
                onSelectDonor(donor);
              } else {
                alert(`Contacting ${donor.name} at ${donor.phone}`);
              }
            }}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonorSuggestions;
