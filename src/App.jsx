import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: 'user', content: input };
    setMessages([...messages, newUserMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://astro-frontend-dpv3.onrender.com/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  messages,
  userId: "example@barc.app"
})
      });
      const data = await res.json();
      setMessages([...messages, newUserMessage, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([...messages, newUserMessage, { role: 'assistant', content: '🧠 Astro is offline right now...' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1>AstroGPT</h1>

      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="message assistant">Astro is thinking...</div>}
      </div>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask Astro something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div className="button-row">
        <button onClick={() => navigate('/journal')}>📓 My Journal</button>
        <button>🐶 Dog Records</button>
      </div>
    </div>
  );
}

export default App;

