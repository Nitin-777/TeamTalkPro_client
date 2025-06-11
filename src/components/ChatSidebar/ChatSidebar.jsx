import React from "react";
import "./ChatSidebar.css";

const ChatSidebar = ({ chats, selectedChatId, onSelectChat }) => (
  <aside className="sidebar">
    <div className="sidebar-header">TeamTalk Pro+</div>
    <nav>
      <ul>
        {chats.map(chat => (
          <li
            key={chat.id}
            className={selectedChatId === chat.id ? "active" : ""}
            onClick={() => onSelectChat(chat.id)}
          >
            <span className="chat-icon">{chat.isGroup ? "👥" : "💬"}</span>
            <span>{chat.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default ChatSidebar;
