import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth
    onLogin(formData.email || formData.name);
  };

  return (
    <div className="glass-panel" style={{ maxWidth: '400px', margin: '4rem auto', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-red)' }}>🩸</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{isLogin ? 'Helloooo' : 'Join the Network'}</h2>
        <p style={{ color: '#aaa' }}>{isLogin ? 'Sign in to connect with heroes.' : 'Sign up to build the community.'}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input required type="text" className="form-input"
              value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe" />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input required type="email" className="form-input"
            value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input required type="password" className="form-input"
            value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••" />
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
