import React from 'react';
import './DraftList.css';

function DraftList({ drafts, selectedDraft, onSelect }) {
  return (
    <div className="draft-list">
      <h2>Drafts</h2>
      <div className="draft-items">
        {drafts.map(draft => (
          <div
            key={draft._id}
            className={`draft-item ${selectedDraft?._id === draft._id ? 'active' : ''}`}
            onClick={() => onSelect(draft)}
          >
            <h3>{draft.title}</h3>
            <div className="draft-meta">
              <span className="seo-badge">SEO: {draft.currentSeoScore}</span>
              <span className="revision-count">{draft.revisions.length} revisions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DraftList;
