import React from "react";
import "./UserList.css";

const UserList = ({ users, selectedUserIds = [], onToggleUser, showRoles = false }) => (
  <div className="user-list">
    <h3 className="user-list-title">Select Users</h3>
    <ul>
      {users.map(user => (
        <li key={user.id} className="user-list-item">
          <label className="user-checkbox">
            <input
              type="checkbox"
              checked={selectedUserIds.includes(user.id)}
              onChange={() => onToggleUser(user.id)}
            />
            <span className="user-info">
              <span className="user-name">{user.username}</span>
              {showRoles && user.role && (
                <span className={`user-role ${user.role === "admin" ? "admin" : ""}`}>
                  {user.role}
                </span>
              )}
            </span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
