import React, { useState, useEffect } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './DraftEditor.css';

function DraftEditor({ draft, onUpdate, onAnalyze, onDelete, loading }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (draft) {
      setTitle(draft.title);
      const contentState = ContentState.createFromText(draft.currentContent || '');
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [draft._id]);

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');
    
    try {
      const content = editorState.getCurrentContent().getPlainText();
      await onUpdate(draft._id, { title, currentContent: content });
      setSaveMessage('Saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleAnalyze = async () => {
    const content = editorState.getCurrentContent().getPlainText();
    
    if (!content.trim()) {
      alert('Please add some content before analyzing');
      return;
    }

    try {
      await onUpdate(draft._id, { currentContent: content });
      await onAnalyze(draft._id);
    } catch (error) {
      console.error('Error during analysis:', error);
    }
  };

  const handleDelete = () => {
    onDelete(draft._id);
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
          {saveMessage && <span className="save-message">{saveMessage}</span>}
          <button onClick={handleSave} className="btn-secondary" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={handleAnalyze} className="btn-success" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze SEO'}
          </button>
          <button onClick={handleDelete} className="btn-danger">
            Delete
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
