import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import DraftList from './components/DraftList';
import DraftEditor from './components/DraftEditor';
import SEOPanel from './components/SEOPanel';
import api from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadDrafts();
    }
  }, [user]);

  const loadDrafts = async () => {
    try {
      const response = await api.get('/drafts');
      setDrafts(response.data);
    } catch (error) {
      console.error('Error loading drafts:', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    const token = localStorage.getItem('token');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setDrafts([]);
    setSelectedDraft(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const createDraft = async () => {
    try {
      const response = await api.post('/drafts', {
        title: 'New Draft',
        currentContent: ''
      });
      setDrafts([response.data, ...drafts]);
      setSelectedDraft(response.data);
    } catch (error) {
      console.error('Error creating draft:', error);
      alert('Failed to create draft. Please try again.');
    }
  };

  const updateDraft = async (id, updates) => {
    try {
      const response = await api.put(`/drafts/${id}`, updates);
      setDrafts(drafts.map(d => d._id === id ? response.data : d));
      setSelectedDraft(response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating draft:', error);
      alert('Failed to save draft. Please try again.');
      throw error;
    }
  };

  const deleteDraft = async (id) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) {
      return;
    }

    try {
      await api.delete(`/drafts/${id}`);
      setDrafts(drafts.filter(d => d._id !== id));
      if (selectedDraft?._id === id) {
        setSelectedDraft(null);
      }
      alert('Draft deleted successfully');
    } catch (error) {
      console.error('Error deleting draft:', error);
      alert('Failed to delete draft. Please try again.');
    }
  };

  const analyzeSEO = async (draftId) => {
    setLoading(true);
    try {
      const response = await api.post(`/seo/analyze/${draftId}`);
      setSelectedDraft(response.data.draft);
      setDrafts(drafts.map(d => d._id === draftId ? response.data.draft : d));
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      alert('Failed to analyze SEO. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>AI Content Optimizer</h1>
        <div className="header-actions">
          <span className="user-name">Welcome, {user.name}</span>
          <button onClick={createDraft} className="btn-primary">+ New Draft</button>
          <button onClick={handleLogout} className="btn-secondary">Logout</button>
        </div>
      </header>
      <div className="app-content">
        <DraftList 
          drafts={drafts} 
          selectedDraft={selectedDraft}
          onSelect={setSelectedDraft}
          onDelete={deleteDraft}
        />
        {selectedDraft && (
          <>
            <DraftEditor 
              draft={selectedDraft}
              onUpdate={updateDraft}
              onAnalyze={analyzeSEO}
              onDelete={deleteDraft}
              loading={loading}
            />
            <SEOPanel draft={selectedDraft} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
