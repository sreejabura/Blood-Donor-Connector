import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import DonorTab from './components/DonorTab';
import RecipientTab from './components/RecipientTab';
import Auth from './components/Auth';
import Account from './components/Account';
import './index.css';

const INITIAL_MOCK_DONORS = [
  { id: 1, name: "Michael Chang", username: "michael@mock.com", bloodGroup: "O+", location: "Downtown Central", landmark: "Near City Mall", lastDonated: "2 months ago", phone: "+1 (555) 123-4567", whatsapp: "https://wa.me/15551234567", instagram: "https://instagram.com/", donationsCount: 5 },
  { id: 2, name: "Sarah Jenkins", username: "sarah@mock.com", bloodGroup: "A-", location: "Westside Suburbs", landmark: "Next to High School", lastDonated: "6 months ago", phone: "+1 (555) 987-6543", whatsapp: "https://wa.me/15559876543", instagram: "https://instagram.com/", donationsCount: 2 },
  { id: 3, name: "David Rodriguez", username: "david@mock.com", bloodGroup: "B+", location: "Medical District", landmark: "Opposite General Hospital", lastDonated: "1 month ago", phone: "+1 (555) 456-7890", whatsapp: "https://wa.me/15554567890", instagram: "https://instagram.com/", donationsCount: 1 },
  { id: 4, name: "Emily Watson", username: "emily@mock.com", bloodGroup: "O-", location: "North Hills", landmark: "Park Lane", lastDonated: "Ready to donate", phone: "+1 (555) 222-3333", whatsapp: "https://wa.me/15552223333", instagram: "https://instagram.com/", donationsCount: 8 },
  { id: 5, name: "James Thompson", username: "james@mock.com", bloodGroup: "AB+", location: "Downtown East", landmark: "Subway Station", lastDonated: "3 months ago", phone: "+1 (555) 444-5555", whatsapp: "https://wa.me/15554445555", instagram: "https://instagram.com/", donationsCount: 3 },
  { id: 6, name: "Lisa Wong", username: "lisa@mock.com", bloodGroup: "A+", location: "University Area", landmark: "Campus Gate 3", lastDonated: "Ready to donate", phone: "+1 (555) 777-8888", whatsapp: "https://wa.me/15557778888", instagram: "https://instagram.com/", donationsCount: 0 }
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('lifedrops_isLoggedIn') === 'true';
  });
  const [user, setUser] = useState(() => {
    return localStorage.getItem('lifedrops_user') || null;
  });
  const [isRegisteredDonor, setIsRegisteredDonor] = useState(() => {
    return localStorage.getItem('lifedrops_isRegisteredDonor') === 'true';
  });
  
  // App State specifically for Donors
  const [donors, setDonors] = useState([]);
  
  // Load donors from localStorage on mount
  useEffect(() => {
    const savedDonors = localStorage.getItem('lifedrops_donors');
    if (savedDonors) {
      setDonors(JSON.parse(savedDonors));
    } else {
      setDonors(INITIAL_MOCK_DONORS);
      localStorage.setItem('lifedrops_donors', JSON.stringify(INITIAL_MOCK_DONORS));
    }
  }, []);

  // Update localStorage when donors change
  useEffect(() => {
    if (donors.length > 0) {
      localStorage.setItem('lifedrops_donors', JSON.stringify(donors));
    }
  }, [donors]);



  // Persist auth and donor registration state
  useEffect(() => {
    localStorage.setItem('lifedrops_isLoggedIn', isLoggedIn);
    if (user) {
      localStorage.setItem('lifedrops_user', user);
    } else {
      localStorage.removeItem('lifedrops_user');
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    localStorage.setItem('lifedrops_isRegisteredDonor', isRegisteredDonor);
  }, [isRegisteredDonor]);

  const handleLogin = (username) => {
    setUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('home');
  };

  const addDonor = (newDonor) => {
    const donorObj = {...newDonor, id: Date.now()};
    
    setDonors(prev => [donorObj, ...prev]);
  };

  const updateDonor = (updatedDonor) => {
    setDonors(prev => prev.map(d => d.id === updatedDonor.id ? updatedDonor : d));
  };

  const deleteDonor = (donorId) => {
    setDonors(prev => {
      const remaining = prev.filter(d => d.id !== donorId);
      // Check if user still has other profiles under this username
      const userStillHasProfiles = remaining.some(d => d.username === user);
      if (!userStillHasProfiles) {
        setIsRegisteredDonor(false);
      }
      return remaining;
    });
  };

  const deleteAccount = () => {
    if (user) {
      setDonors(prev => prev.filter(d => d.username !== user));
    }
    setIsLoggedIn(false);
    setUser(null);
    setIsRegisteredDonor(false);
    setActiveTab('home');
  };

  if (!isLoggedIn) {
    return (
      <div className="app-container">
        <header className="header" style={{ justifyContent: 'center' }}>
          <div className="logo">
            <span className="logo-icon">🩸</span>
            Blood Donor Connector
          </div>
        </header>
        <Auth onLogin={handleLogin} />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} donors={donors} isRegisteredDonor={isRegisteredDonor} />;
      case 'donor':
        return <DonorTab addDonor={addDonor} setIsRegisteredDonor={setIsRegisteredDonor} user={user} />;
      case 'recipient':
        return <RecipientTab donors={donors} />;
      case 'account':
        return <Account 
          user={user} 
          donors={donors} 
          isRegisteredDonor={isRegisteredDonor} 
          updateDonor={updateDonor} 
          deleteDonor={deleteDonor} 
          deleteAccount={deleteAccount} 
          handleLogout={handleLogout} 
        />;
      default:
        return <Home setActiveTab={setActiveTab} donors={donors} />;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo" onClick={() => setActiveTab('home')} style={{cursor: 'pointer'}}>
          <span className="logo-icon">🩸</span>
          Blood Donor Connector
        </div>
        
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={`tab-btn ${activeTab === 'donor' ? 'active' : ''}`}
            onClick={() => setActiveTab('donor')}
          >
            Become a Donor
          </button>
          <button 
            className={`tab-btn ${activeTab === 'recipient' ? 'active' : ''}`}
            onClick={() => setActiveTab('recipient')}
          >
            Find a Donor
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', borderLeft: '1px solid var(--glass-border)', paddingLeft: '1rem' }}>
            <button 
              className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
              style={{ marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>👤</span> Account
            </button>
          </div>
        </div>
      </header>

      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
