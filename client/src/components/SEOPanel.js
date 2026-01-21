import React from 'react';
import './SEOPanel.css';

function SEOPanel({ draft }) {
  const latestRevision = draft.revisions[draft.revisions.length - 1];

  return (
    <div className="seo-panel">
      <h2>SEO Analysis</h2>
      
      <div className="seo-score">
        <div className="score-circle">
          <span className="score-value">{draft.currentSeoScore}</span>
          <span className="score-label">SEO Score</span>
        </div>
      </div>

      {latestRevision && (
        <>
          <div className="seo-section">
            <h3>Keywords</h3>
            <div className="keyword-list">
              {latestRevision.keywords?.map((keyword, idx) => (
                <span key={idx} className="keyword-tag">{keyword}</span>
              ))}
            </div>
          </div>

          <div className="seo-section">
            <h3>Recommendations</h3>
            <ul className="recommendation-list">
              {latestRevision.recommendations?.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="seo-section">
        <h3>Revision History</h3>
        <div className="revision-list">
          {draft.revisions.map((rev, idx) => (
            <div key={idx} className="revision-item">
              <span className="revision-number">v{idx + 1}</span>
              <span className="revision-score">Score: {rev.seoScore}</span>
              <span className="revision-date">
                {new Date(rev.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SEOPanel;
