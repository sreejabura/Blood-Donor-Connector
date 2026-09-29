import React, { useState } from 'react';

const compatibilityMatrix = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'O+': ['O+', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'AB+': ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'],
  'A-': ['A-', 'O-'],
  'O-': ['O-'],
  'B-': ['B-', 'O-'],
  'AB-': ['AB-', 'A-', 'B-', 'O-']
};

const allBloodTypes = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

const BloodMatcher = () => {
  const [selectedType, setSelectedType] = useState('A+');
  const compatibleTypes = compatibilityMatrix[selectedType];

  return (
    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', marginBottom: '4rem' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Blood Compatibility Matcher</h2>
      <p style={{ color: '#aaa', marginBottom: '2rem' }}>Select your blood group to see who can safely donate to you.</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <select 
          className="form-select" 
          value={selectedType} 
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ width: '200px', fontSize: '1.2rem', textAlign: 'center', background: 'rgba(0,0,0,0.8)' }}
        >
          {allBloodTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '1rem', 
        flexWrap: 'wrap',
        position: 'relative'
      }}>
        {allBloodTypes.map(type => {
          const isCompatible = compatibleTypes.includes(type);
          return (
            <div 
              key={type}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                border: isCompatible ? '2px solid var(--primary-red)' : '2px solid #333',
                background: isCompatible ? 'rgba(230, 57, 70, 0.2)' : 'rgba(0, 0, 0, 0.5)',
                color: isCompatible ? '#fff' : '#555',
                boxShadow: isCompatible ? '0 0 15px rgba(230, 57, 70, 0.5)' : 'none',
                transition: 'all 0.4s ease',
                transform: isCompatible ? 'scale(1.1)' : 'scale(0.9)'
              }}
              title={isCompatible ? `Compatible with ${selectedType}` : `Not compatible`}
            >
              {type}
            </div>
          )
        })}
      </div>
      <p style={{ marginTop: '2rem', color: 'var(--primary-red)', fontWeight: 'bold' }}>
        {compatibleTypes.length === 8 ? 'Universal Recipient! You can receive any blood type.' : 
         compatibleTypes.length === 1 ? 'Universal Donor! But you can only receive O- blood.' :
         `You can receive blood from ${compatibleTypes.length} different types.`}
      </p>
    </div>
  );
};

export default BloodMatcher;
