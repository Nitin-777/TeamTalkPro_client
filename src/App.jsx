import React, { useState } from "react";
import ChatSidebar from "./components/ChatSidebar/ChatSidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import GroupCreationModal from "./components/GroupCreationModal/GroupCreationModal";

function App() {
  
  const [chats, setChats] = useState([
    { id: 1, name: "Nitin", isGroup: false },
    { id: 2, name: "Team Project", isGroup: true },
  ]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([
    { id: 1, username: "You", role: "admin" },
    { id: 2, username: "Raju", role: "member" },
    { id: 3, username: "Prasidh", role: "member" },
  ]);
  const currentUserId = 1;
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [allUsers, setAllUsers] = useState([
    { id: 2, username: "Raju" },
    { id: 3, username: "Jabir" },
    { id: 4, username: "Piyush" },
  ]);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      senderId: currentUserId,
      senderName: "You",
      content: content,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
  };

  
  const handleSelectChat = (chatId) => {
    const selectedChat = chats.find(chat => chat.id === chatId);
    setCurrentChat(selectedChat);
    
    setMessages([
      { id: 1, senderId: currentUserId, senderName: "You", content: "Hello!", timestamp: "10:00 AM" },
      { id: 2, senderId: 2, senderName: "Alice", content: "Hi there!", timestamp: "10:01 AM" },
    ]);
    setMembers([
      { id: 1, username: "You", role: "admin" },
      { id: 2, username: "Alice", role: "member" },
    ]);
  };

  
  const handleCreateGroup = () => {
    setShowGroupModal(true);
  };

 
  const handleGroupSubmit = ({ name, memberIds }) => {
    const newGroup = {
      id: Date.now(),
      name: name,
      isGroup: true,
    };
    setChats([...chats, newGroup]);
    setCurrentChat(newGroup);
    setShowGroupModal(false);
    setMembers([
      { id: currentUserId, username: "You", role: "admin" },
      ...memberIds.map(id => ({
        id,
        username: allUsers.find(u => u.id === id)?.username || "User",
        role: "member",
      })),
    ]);
    setMessages([]);
  };

  
  const appContainerStyle = {
    display: "flex",
    height: "100vh",
    overflow: "hidden", 
  };

  const chatPlaceholderStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fc",
    color: "#888",
    fontSize: "1.2rem",
  };

  return (
    <div style={appContainerStyle}>
      <ChatSidebar
        chats={chats}
        selectedChatId={currentChat?.id}
        onSelectChat={handleSelectChat}
      />
      {currentChat ? (
        <ChatWindow
          chat={currentChat}
          messages={messages}
          members={members}
          currentUserId={currentUserId}
          onSendMessage={handleSendMessage}
          onCreateGroup={handleCreateGroup}
        />
      ) : (
        <div style={chatPlaceholderStyle}>
          <p>Select a chat to start messaging</p>
        </div>
      )}
      {showGroupModal && (
        <GroupCreationModal
          users={allUsers}
          onCreate={handleGroupSubmit}
          onClose={() => setShowGroupModal(false)}
        />
      )}
    </div>
  );
}

export default App;
