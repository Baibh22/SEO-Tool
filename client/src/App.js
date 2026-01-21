import React, { useState, useEffect } from 'react';
import './App.css';
import DraftList from './components/DraftList';
import DraftEditor from './components/DraftEditor';
import SEOPanel from './components/SEOPanel';
import api from './services/api';

function App() {
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = async () => {
    try {
      const response = await api.get('/drafts');
      setDrafts(response.data);
    } catch (error) {
      console.error('Error loading drafts:', error);
    }
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
    }
  };

  const updateDraft = async (id, updates) => {
    try {
      const response = await api.put(`/drafts/${id}`, updates);
      setDrafts(drafts.map(d => d._id === id ? response.data : d));
      setSelectedDraft(response.data);
    } catch (error) {
      console.error('Error updating draft:', error);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>AI Content Optimizer</h1>
        <button onClick={createDraft} className="btn-primary">+ New Draft</button>
      </header>
      <div className="app-content">
        <DraftList 
          drafts={drafts} 
          selectedDraft={selectedDraft}
          onSelect={setSelectedDraft}
        />
        {selectedDraft && (
          <>
            <DraftEditor 
              draft={selectedDraft}
              onUpdate={updateDraft}
              onAnalyze={analyzeSEO}
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
