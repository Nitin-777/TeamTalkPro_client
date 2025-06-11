// GroupCreationModal.jsx
import React, { useState } from "react";
import "./GroupCreationModal.css";

const GroupCreationModal = ({ users, onCreate, onClose }) => {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);

  const toggleUser = id => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name && selected.length) {
      onCreate({ name, memberIds: selected });
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Create Group</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Group Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <div className="user-list">
            {users.map(user => (
              <label key={user.id} className="user-checkbox">
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={() => toggleUser(user.id)}
                />
                {user.username}
              </label>
            ))}
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupCreationModal;
