import React, { useState } from 'react';

const DonorTab = ({ addDonor, setIsRegisteredDonor, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    bloodGroup: '',
    location: '',
    landmark: '',
    lastDonated: '',
    medicalHistory: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalData = { ...formData, donationsCount: 0, username: user };
    if (finalData.whatsapp) {
      let cleanNumber = finalData.whatsapp.replace(/[^\d+]/g, '');
      cleanNumber = cleanNumber.replace('+', '');
      finalData.whatsapp = `https://wa.me/${cleanNumber}`;
    }
    if (finalData.instagram) {
      let cleanUser = finalData.instagram.replace('@', '').trim();
      finalData.instagram = `https://instagram.com/${cleanUser}`;
    }

    // Add the new donor to the global state
    addDonor(finalData);
    
    if (setIsRegisteredDonor) {
      setIsRegisteredDonor(true);
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>Thank You for Registering!</h2>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Your profile has been added to our network. You are now a verified hero.</p>
        <button className="btn-outline" onClick={() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', phone: '', whatsapp: '', instagram: '', bloodGroup: '', location: '', landmark: '', lastDonated: '', medicalHistory: '' });
        }}>Register Another User</button>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Perfect Donor Registration</h2>
        <p style={{ color: '#aaa' }}>Fill out the details below to join our life-saving community.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Full Name</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="John Doe" />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="john@example.com" />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="+1 (555) 000-0000" />
        </div>

        <div className="form-group">
          <label className="form-label">Blood Group</label>
          <select required name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="form-select">
            <option value="">Select Blood Group</option>
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

        <div className="form-group">
          <label className="form-label">City / Location</label>
          <input required type="text" name="location" value={formData.location} onChange={handleChange} className="form-input" placeholder="e.g., New York, NY" />
        </div>

        <div className="form-group">
          <label className="form-label">Nearest Landmark</label>
          <input required type="text" name="landmark" value={formData.landmark} onChange={handleChange} className="form-input" placeholder="e.g., Near City Mall" />
        </div>
        
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Date of Last Donation (Optional)</label>
          <input type="date" name="lastDonated" value={formData.lastDonated} onChange={handleChange} className="form-input" />
        </div>
        
        <div className="form-group">
          <label className="form-label">WhatsApp Number (Optional)</label>
          <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="form-input" placeholder="e.g., 15551234567" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Instagram Username (Optional)</label>
          <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="form-input" placeholder="e.g., @username" />
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Brief Medical History (Optional)</label>
          <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} className="form-textarea" rows="3" placeholder="Any relevant medical conditions..." />
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.2rem' }}>
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonorTab;
