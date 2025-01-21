import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AddGroupForm = ({ session }) => {
  const [groupName, setGroupName] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', session.user.id);
      if (error) console.error(error);
      else setContacts(data);
    };
    fetchContacts();
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('groups')
      .insert({ name: groupName, user_id: session.user.id });

    if (error) console.error(error);
    else {
      const groupId = data[0].id;
      await Promise.all(
        selectedContactIds.map((contactId) =>
          supabase
            .from('contacts')
            .update({ group_id: groupId })
            .eq('id', contactId)
        )
      );
    }

    setGroupName('');
    setSelectedContactIds([]);
  };

  const handleContactSelect = (id) => {
    setSelectedContactIds((prevState) =>
      prevState.includes(id)
        ? prevState.filter((contactId) => contactId !== id)
        : [...prevState, id]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        required
      />
      <div>
        <h3>Select Contacts</h3>
        {contacts.map((contact) => (
          <label key={contact.id}>
            <input
              type="checkbox"
              checked={selectedContactIds.includes(contact.id)}
              onChange={() => handleContactSelect(contact.id)}
            />
            {contact.name}
          </label>
        ))}
      </div>
      <button type="submit">Create Group</button>
    </form>
  );
};

export default AddGroupForm;
