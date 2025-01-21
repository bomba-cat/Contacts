import React, { useState } from 'react';

const View = ({ user, closeView, onUpdateUser }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await onUpdateUser(updatedUser);
    closeView();
  };

  return (
    <div className="view-overlay" onClick={closeView}>
      <div className="view-content" onClick={(e) => e.stopPropagation()}>
        <h2>User View</h2>
        <form>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={updatedUser.phone}
            onChange={handleChange}
          />
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={closeView}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default View;
