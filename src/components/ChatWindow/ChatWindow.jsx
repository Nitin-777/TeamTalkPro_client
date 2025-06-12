import React, { useState, useRef, useEffect } from "react";
import "./ChatWindow.css";

const ChatWindow = ({ chat, messages, members, currentUserId, onSendMessage, onCreateGroup }) => {
  const [content, setContent] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSendMessage(content);
      setContent("");
    }
  };

  return (
    <div className="chat-window">
      <header className="chat-header">
        <div>
          <strong>{chat.name}</strong>
          {chat.isGroup && (
            <div className="chat-members">
              {members.map(m => (
                <div key={m.id} className="member-pill-container">
                  <span className="member-pill">{m.username}</span>
                  <span className={`member-role ${m.role === "admin" ? "admin" : ""}`}>
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {!chat.isGroup && (
          <button className="create-group-btn" onClick={onCreateGroup}>
            Create Group
          </button>
        )}
      </header>
      <div className="chat-messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`chat-message${msg.senderId === currentUserId ? " own" : ""}`}
          >
            <div className="msg-meta">
              <span className="msg-user">{msg.senderName}</span>
              <span className="msg-time">{msg.timestamp}</span>
            </div>
            <div className="msg-content">{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Type a message..."
          autoComplete="off"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
