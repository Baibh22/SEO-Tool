import React, { useState, useEffect } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './DraftEditor.css';

function DraftEditor({ draft, onUpdate, onAnalyze, loading }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (draft) {
      setTitle(draft.title);
      const contentState = ContentState.createFromText(draft.currentContent || '');
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [draft._id]);

  const handleSave = () => {
    const content = editorState.getCurrentContent().getPlainText();
    onUpdate(draft._id, { title, currentContent: content });
  };

  const handleAnalyze = () => {
    const content = editorState.getCurrentContent().getPlainText();
    onUpdate(draft._id, { currentContent: content }).then(() => {
      onAnalyze(draft._id);
    });
  };

  return (
    <div className="draft-editor">
      <div className="editor-header">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
          placeholder="Draft title..."
        />
        <div className="editor-actions">
          <button onClick={handleSave} className="btn-secondary">Save</button>
          <button onClick={handleAnalyze} className="btn-success" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze SEO'}
          </button>
        </div>
      </div>
      <div className="editor-content">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Start writing your content..."
        />
      </div>
    </div>
  );
}

export default DraftEditor;
