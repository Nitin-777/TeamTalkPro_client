import React, { useState } from "react";
import ChatSidebar from "./components/ChatSidebar/ChatSidebar.jsx";
import ChatWindow from "./components/ChatWindow/ChatWindow.jsx";
import GroupCreationModal from "./components/GroupCreationModal/GroupCreationModal.jsx";

const App = () => {
  // Dummy state and data
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [showGroupModal, setShowGroupModal] = useState(true);

  const dummyChats = [
    { id: 1, name: "General", isGroup: true },
    { id: 2, name: "Nitin", isGroup: false },
  ];

  const dummyMessages = [
    {
      id: 1,
      senderId: 1,
      senderName: "Mohan",
      timestamp: "10:30 AM",
      content: "Hey there!",
    },
    {
      id: 2,
      senderId: 2,
      senderName: "You",
      timestamp: "10:31 AM",
      content: "Hello!",
    },
  ];

  const dummyMembers = [
    { id: 1, username: "Mohan", role: "admin" },
    { id: 2, username: "Ramesh", role: "member" },
  ];

  const dummyUsers = [
    { id: 1, username: "Mohan" },
    { id: 2, username: "Nitin" },
    { id: 3, username: "Ramesh" },
  ];

  const selectedChat = dummyChats.find((chat) => chat.id === selectedChatId);

  const handleSendMessage = (content) => {
    console.log("Send Message:", content);
  };

  const handleCreateGroup = (groupData) => {
    console.log("Group Created:", groupData);
    setShowGroupModal(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ChatSidebar
        chats={dummyChats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
      />

      <ChatWindow
        chat={selectedChat}
        messages={dummyMessages}
        members={dummyMembers}
        currentUserId={2}
        onSendMessage={handleSendMessage}
      />

      {showGroupModal && (
        <GroupCreationModal
          users={dummyUsers}
          onCreate={handleCreateGroup}
          onClose={() => setShowGroupModal(false)}
        />
      )}
    </div>
  );
};

export default App;
