import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import BarcLoop from './BarcLoop';

function Journal() {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [type, setType] = useState('Free Writing');
  const [showBarc, setShowBarc] = useState(false);
  const navigate = useNavigate();

  const isReady = date && title;

  return (
    <div className="chat-container">
      <button onClick={() => navigate('/')}>← Back to Chat</button>
      <h1>📓 My Journal</h1>

      {/* Top Toolbar */}
      <div className="toolbar">
        <select value={type} onChange={e => setType(e.target.value)}>
          <option>Free Writing</option>
          <option>Gratitude</option>
          <option>My Goals</option>
          <option>The New 'Me'</option>
        </select>

        <button>📅 My Calendar</button>
        <button onClick={() => setShowBarc(true)}>🧠 BARC Loop</button>

        <div className="dropdown">
          <button>✍️ Prompts ▾</button>
          <div className="dropdown-content">
            <div>Gratitude</div>
            <div>Self-Improvement</div>
            <div>Affirmations</div>
          </div>
        </div>

        <div className="dropdown">
          <button>🔍 Examples ▾</button>
          <div className="dropdown-content">
            <div>BARC Loops</div>
            <div>Goals</div>
          </div>
        </div>
      </div>

      {/* Entry Fields */}
      <div className="input-row">
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
          title="For future reference. E.g., 'Just because', 'My Birthday', 'Great day', 'I met someone'"
        />
      </div>

      {/* Injected BARC Loop */}
      {showBarc && <BarcLoop onRemove={() => setShowBarc(false)} />}

      <textarea
        value={entry}
        onChange={e => setEntry(e.target.value)}
        placeholder={entry ? '' : 'Free Writing Style'}
        className="messages"
      />

      {!isReady && <p style={{ color: 'red' }}>Date and Title are required to begin writing.</p>}

      <div className="button-row">
        <button disabled={!isReady}>Save Entry</button>
      </div>
    </div>
  );
}

export default Journal;

