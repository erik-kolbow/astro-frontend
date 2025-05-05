import React, { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Floating Button */}
      {!isOpen && (
        <div
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            cursor: 'pointer',
          }}
        >
          <img
            src="/ASTRO_Circle500x500.png"
            alt="Astro Icon"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          />
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '400px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#1E73BE',
              color: '#fff',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            Ask Astro
            <button
              onClick={toggleChat}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Chat Input */}
          <div style={{ padding: '16px', flexGrow: 1 }}>
            <textarea
              style={{
                width: '100%',
                height: '200px',
                resize: 'none',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
              placeholder="Ask Astro something..."
            />
          </div>

          {/* Footer Buttons */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <button
              style={{
                flexGrow: 1,
                backgroundColor: '#1E73BE',
                color: '#fff',
                padding: '10px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Send
            </button>

            <button
              style={{
                flexGrow: 1,
                backgroundColor: '#FAFBFD',
                color: '#1E2132',
                border: '1px solid #D6D9DD',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
              onClick={() => window.open('/journal', '_blank')}
            >
              📓 My Journal
            </button>

            <button
              style={{
                flexGrow: 1,
                backgroundColor: '#FAFBFD',
                color: '#1E2132',
                border: '1px solid #D6D9DD',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
              onClick={() => window.open('/dog-records', '_blank')}
            >
              🐶 Dog Records
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

