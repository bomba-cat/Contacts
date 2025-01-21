import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const GroupList = ({ session }) => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*, contacts(*)')
        .eq('user_id', session.user.id);
      if (error) console.error(error);
      else setGroups(data);
    };
    fetchGroups();
  }, [session]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', session.user.id);
      if (error) console.error(error);
      else setUsers(data);
    };
    fetchUsers();
  }, [session]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleEditGroup = (groupId) => {
    setIsEditingGroup(true);
    setSelectedGroupId(groupId);
    const group = groups.find((group) => group.id === groupId);
    setGroupName(group.name);
  };

  const handleUpdateGroup = async () => {
    const { error } = await supabase
      .from('groups')
      .update({ name: groupName })
      .eq('id', selectedGroupId);
    if (error) console.error(error);
    setIsEditingGroup(false);
    setGroupName('');
  };

  const handleDeleteGroup = async (groupId) => {
    const { error } = await supabase
      .from('groups')
      .delete()
      .eq('id', groupId);
    if (error) console.error(error);
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  const handleAddUserToGroup = async (userId) => {
    const { error } = await supabase
      .from('contacts')
      .update({ group_id: selectedGroupId })
      .eq('id', userId);
    if (error) console.error(error);
    else {
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    const { error } = await supabase
      .from('contacts')
      .update(updatedUser)
      .eq('id', updatedUser.id);
    if (error) console.error(error);
  };

  return (
    <div>
      <h2>Your Groups</h2>
      {groups.map((group) => (
        <div key={group.id}>
          <h3>
            {group.name}{' '}
            <button onClick={() => handleEditGroup(group.id)}>Edit Group</button>{' '}
            <button onClick={() => handleDeleteGroup(group.id)}>Delete Group</button>
          </h3>
          <ul>
            {group.contacts.map((contact) => (
              <li key={contact.id}>
                {contact.name} - {contact.email} - {contact.phone}{' '}
                <button onClick={() => handleUpdateUser(contact)}>Edit User</button>
              </li>
            ))}
          </ul>
          {isEditingGroup && selectedGroupId === group.id && (
            <div>
              <h4>Edit Group</h4>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <button onClick={handleUpdateGroup}>Save</button>
              <button onClick={() => setIsEditingGroup(false)}>Cancel</button>
              <div>
                <h4>Add Existing Users to Group</h4>
                <select onChange={(e) => handleAddUserToGroup(e.target.value)}>
                  <option>Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.email} - {user.phone}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupList;
