import React from 'react';
import './DraftList.css';

function DraftList({ drafts, selectedDraft, onSelect, onDelete }) {
  const handleDelete = (e, draftId) => {
    e.stopPropagation();
    onDelete(draftId);
  };

  return (
    <div className="draft-list">
      <h2>Drafts</h2>
      {drafts.length === 0 ? (
        <p className="no-drafts">No drafts yet. Create one to get started!</p>
      ) : (
        <div className="draft-items">
          {drafts.map(draft => (
            <div
              key={draft._id}
              className={`draft-item ${selectedDraft?._id === draft._id ? 'active' : ''}`}
              onClick={() => onSelect(draft)}
            >
              <div className="draft-item-header">
                <h3>{draft.title}</h3>
                <button 
                  className="delete-icon"
                  onClick={(e) => handleDelete(e, draft._id)}
                  title="Delete draft"
                >
                  ×
                </button>
              </div>
              <div className="draft-meta">
                <span className="seo-badge">SEO: {draft.currentSeoScore}</span>
                <span className="revision-count">{draft.revisions.length} revisions</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DraftList;
