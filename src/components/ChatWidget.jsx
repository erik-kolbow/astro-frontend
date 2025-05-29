import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ask`, {
, {
, {
        message: input,
      });
      setMessages((prev) => [...prev, { text: res.data.response, sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to get response", sender: "bot" },
      ]);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {!isOpen && (
        <div
          onClick={toggleChat}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <img
            src="/ASTRO_Circle500x500.png"
            alt="Astro Icon"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      )}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "400px",
            height: "500px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              background: "#1E73BE",
              color: "#fff",
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            Ask Astro
            <button
              onClick={toggleChat}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>

          <div
            style={{
              flexGrow: 1,
              padding: "20px",
              overflowY: "auto",
              backgroundColor: "#f8f8f8",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  maxWidth: "80%",
                  marginBottom: "10px",
                  padding: "12px",
                  borderRadius: "10px",
                  lineHeight: 1.5,
                  fontSize: "16px",
                  whiteSpace: "pre-wrap",
                  backgroundColor: m.sender === "user" ? "#d0f0ff" : "#fff",
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  textAlign: m.sender === "user" ? "right" : "left",
                  border: m.sender === "bot" ? "1px solid #ccc" : "none",
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Talk to Astro..."
              style={{
                flex: 1,
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

