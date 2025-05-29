import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    console.log("Sending message to GPT backend:", input);

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/ask`,
        {
          message: input,
        }
      );
      setMessages((prev) => [
        ...prev,
        { text: res.data.response, sender: "bot" },
      ]);
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
            width: "350px",
            maxHeight: "500px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            zIndex: 1001,
          }}
        >
          <div style={{ padding: "10px", fontWeight: "bold", backgroundColor: "#007bff", color: "#fff", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
            Ask Astro
            <span style={{ float: "right", cursor: "pointer" }} onClick={toggleChat}>×</span>
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: msg.sender === "user" ? "#e0f7fa" : "#eee",
                  padding: "8px",
                  marginBottom: "6px",
                  borderRadius: "6px",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.sender === "user" ? "You: " : "Astro: "} {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div style={{ padding: "10px", display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Talk to Astro..."
              style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <button onClick={sendMessage} style={{ padding: "8px 12px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px" }}>
              Send
            </button>
          </div>
          <div style={{ padding: "6px 10px", fontSize: "12px", color: "#999", textAlign: "center" }}>
            Not a medical or therapeutic replacement.
          </div>
        </div>
      )}
    </>
  );
}

