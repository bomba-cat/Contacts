import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AddContactForm = ({ session }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    group_id: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('contacts')
      .insert({ ...formData, user_id: session.user.id });
    if (error) console.error(error);
    setFormData({ name: '', email: '', phone: '', group_id: null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContactForm;
