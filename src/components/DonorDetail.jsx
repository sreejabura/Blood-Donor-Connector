import React from 'react';
import { getDonorBadge } from '../utils/badges';

const DonorDetail = ({ donor, onBack }) => {
  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', fontSize: '1.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>&larr;</span> Back to Search
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <div className="blood-group-badge" style={{ width: '120px', height: '120px', fontSize: '3rem' }}>
          {donor.bloodGroup}
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {donor.name}
            {getDonorBadge(donor.donationsCount) && (
              <span style={{ fontSize: '1.2rem', background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.4rem', color: getDonorBadge(donor.donationsCount).color }}>
                {getDonorBadge(donor.donationsCount).icon} {getDonorBadge(donor.donationsCount).text}
              </span>
            )}
          </h2>
          <p style={{ color: '#aaa', fontSize: '1.2rem' }}>📍 {donor.location} &bull; Landmark: {donor.landmark}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
          <h4 style={{ color: 'var(--primary-red)', marginBottom: '0.5rem' }}>Contact Number</h4>
          <p style={{ fontSize: '1.2rem' }}>{donor.phone}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
          <h4 style={{ color: 'var(--primary-red)', marginBottom: '0.5rem' }}>Last Donated</h4>
          <p style={{ fontSize: '1.2rem' }}>{donor.lastDonated || 'Never / Ready to donate'}</p>
        </div>
        {donor.medicalHistory && (
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', gridColumn: '1 / -1' }}>
            <h4 style={{ color: 'var(--primary-red)', marginBottom: '0.5rem' }}>Medical Note</h4>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>{donor.medicalHistory}</p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a 
          href={donor.whatsapp || `https://wa.me/${donor.phone.replace(/\D/g,'')}`} 
          target="_blank" 
          rel="noreferrer"
          className="btn-primary" 
          style={{ flex: 1, textAlign: 'center', background: '#25D366', textDecoration: 'none' }}
        >
          Message on WhatsApp
        </a>
        {donor.instagram && donor.instagram.trim() !== '' && donor.instagram !== 'https://instagram.com/' && (
          <a 
            href={donor.instagram} 
            target="_blank" 
            rel="noreferrer"
            className="btn-outline" 
            style={{ flex: 1, textAlign: 'center', borderColor: '#E1306C', color: '#E1306C', textDecoration: 'none' }}
          >
            View Instagram
          </a>
        )}
      </div>
    </div>
  );
};

export default DonorDetail;
