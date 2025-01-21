import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AddGroupForm = ({ session }) => {
  const [groupName, setGroupName] = useState('');
  const [contacts, setContacts] = useState([]);

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
    }

    setGroupName('');
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
      <button type="submit">Create Group</button>
    </form>
  );
};

export default AddGroupForm;
