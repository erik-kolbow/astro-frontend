import React from 'react';
import './BarcLoop.css';
import logo from './barc-logo.png';

function BarcLoop({ onRemove }) {
  return (
    <div className="barc-loop-box">
      <div className="barc-logo-header">
        <img src={logo} alt="BARC Method Logo" className="barc-logo" />
        <h2>The BARC LOOP</h2>
        <p className="barc-tagline">"Clarity Influences Behaviors & Results"</p>
        {onRemove && <button className="remove-btn" onClick={onRemove}>✖</button>}
      </div>

      <div className="barc-loop-title">
        <label>Title:</label>
        <input type="text" placeholder="Enter title here..." />
      </div>

      <div className="barc-loop-columns">
        <div className="barc-box">
          <label>Clarity</label>
          <textarea placeholder="What is the situation? What's happening?" />
        </div>
        <div className="arrow">→</div>
        <div className="barc-box">
          <label>Influence</label>
          <textarea placeholder="Why is this happening? What’s the deeper cause or trigger?" />
        </div>
        <div className="arrow">→</div>
        <div className="barc-box">
          <label>Behavior</label>
          <textarea placeholder="What will I do in response?" />
        </div>
        <div className="arrow">→</div>
        <div className="barc-box">
          <label>Result</label>
          <textarea placeholder="What outcome do I expect or want?" />
        </div>
      </div>

      <div className="barc-loop-footer">
        Copyright © 2025 BARC Method Solutions
      </div>
    </div>
  );
}

export default BarcLoop;

