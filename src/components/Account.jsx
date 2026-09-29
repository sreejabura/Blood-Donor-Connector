import React, { useState } from 'react';

const Account = ({ user, donors, isRegisteredDonor, updateDonor, deleteDonor, deleteAccount, handleLogout }) => {
  const [editingId, setEditingId] = useState(null);
  
  // Find ALL donor profiles linked to this user
  const myDonorProfiles = donors.filter(d => d.username === user);
  
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: 'A+',
    location: '',
    landmark: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    lastDonated: '',
    medicalHistory: ''
  });

  const handleEditClick = (profile) => {
    setFormData(profile);
    setEditingId(profile.id);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateDonor({ ...formData, id: editingId, username: user });
    setEditingId(null);
    alert('This donor profile has been updated!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease', padding: '2rem' }}>
      
      {/* SECTION 1: User Account Hub */}
      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>⚙️</span> Account Settings
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', flex: 1 }}>
            <h4 style={{ color: 'var(--primary-red)', marginBottom: '0.5rem' }}>Username</h4>
            <p style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>{user}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', flex: 1 }}>
            <h4 style={{ color: 'var(--primary-red)', marginBottom: '0.5rem' }}>Donor Status</h4>
            <p style={{ fontSize: '1.5rem', margin: 0 }}>
              {isRegisteredDonor ? `✅ Active (${myDonorProfiles.length} profiles)` : '❌ Not Registered'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
          <button 
            className="btn-outline" 
            onClick={handleLogout}
            style={{ flex: 1, color: '#aaa', borderColor: '#555' }}
          >
            Sign Out
          </button>
          <button 
            className="btn-primary" 
            onClick={() => {
              if (window.confirm("Are you sure you want to completely delete your account and all associated profiles? This action cannot be undone.")) {
                deleteAccount();
              }
            }}
            style={{ flex: 1, background: 'linear-gradient(135deg, #cc0000 0%, #880000 100%)', boxShadow: '0 5px 15px rgba(200, 0, 0, 0.4)' }}
          >
            Delete Entire Account
          </button>
        </div>
      </div>

      {/* SECTION 2: Donor Profiles Management */}
      {(isRegisteredDonor && myDonorProfiles.length > 0) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {myDonorProfiles.map(profile => (
            <div key={profile.id} className="glass-panel" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', margin: 0 }}>Profile: {profile.name}</h3>
                {editingId !== profile.id ? (
                  <button className="btn-outline" onClick={() => handleEditClick(profile)} style={{ padding: '0.5rem 1rem' }}>
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <button className="btn-outline" onClick={() => setEditingId(null)} style={{ padding: '0.5rem 1rem', color: '#aaa', borderColor: '#555' }}>
                    Cancel Edit
                  </button>
                )}
              </div>

              {editingId !== profile.id ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <p style={{ color: '#aaa', margin: '0 0 0.2rem 0', fontSize: '0.9rem' }}>Blood Group</p>
                    <div className="blood-group-badge" style={{ width: '50px', height: '50px', fontSize: '1.2rem', margin: 0 }}>{profile.bloodGroup}</div>
                  </div>
                  <div>
                    <p style={{ color: '#aaa', margin: '0 0 0.2rem 0', fontSize: '0.9rem' }}>Location & Landmark</p>
                    <p style={{ fontSize: '1.1rem', margin: 0 }}>📍 {profile.location} (Near {profile.landmark})</p>
                  </div>
                  <div>
                    <p style={{ color: '#aaa', margin: '0 0 0.2rem 0', fontSize: '0.9rem' }}>Phone</p>
                    <p style={{ fontSize: '1.1rem', margin: 0 }}>📞 {profile.phone}</p>
                  </div>
                  {profile.whatsapp && (
                    <div>
                      <p style={{ color: '#aaa', margin: '0 0 0.2rem 0', fontSize: '0.9rem' }}>WhatsApp</p>
                      <p style={{ fontSize: '1.1rem', margin: 0 }}>💬 {profile.whatsapp}</p>
                    </div>
                  )}
                  {profile.instagram && (
                    <div>
                      <p style={{ color: '#aaa', margin: '0 0 0.2rem 0', fontSize: '0.9rem' }}>Instagram</p>
                      <p style={{ fontSize: '1.1rem', margin: 0 }}>📷 {profile.instagram}</p>
                    </div>
                  )}
                  
                  <div style={{ gridColumn: '1 / -1', marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', textAlign: 'center' }}>
                     <button 
                      onClick={() => {
                        if (window.confirm(`Unpublish ${profile.name}'s donor profile?`)) {
                          deleteDonor(profile.id);
                        }
                      }}
                      style={{ background: 'none', border: 'none', color: '#ff4444', textDecoration: 'underline', cursor: 'pointer', fontSize: '1rem' }}
                    >
                      Delete this Donor Profile
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Blood Group</label>
                      <select className="form-select" value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} required>
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
                      <label className="form-label">Location (City/Area)</label>
                      <input type="text" className="form-input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Nearest Landmark</label>
                      <input type="text" className="form-input" value={formData.landmark} onChange={e => setFormData({...formData, landmark: e.target.value})} required />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input type="tel" className="form-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                    </div>

                    <div className="form-group">
                      <label className="form-label">WhatsApp Link (Optional)</label>
                      <input type="url" className="form-input" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="https://wa.me/..." />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Instagram Link (Optional)</label>
                      <input type="url" className="form-input" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} placeholder="https://instagram.com/..." />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Last Donated (Optional)</label>
                      <input type="text" className="form-input" value={formData.lastDonated} onChange={e => setFormData({...formData, lastDonated: e.target.value})} placeholder="e.g. 2 months ago" />
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem' }}>
                    <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }}>
                      💾 Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Account;
