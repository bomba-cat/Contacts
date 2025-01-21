import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import View from './View';

const ContactList = ({ session }) => {
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

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

  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('user_id', session.user.id);
      if (error) console.error(error);
      else setGroups(data);
    };
    fetchGroups();
  }, [session]);

  const handleContactClick = (contact) => {
    setSelectedUser(contact);
  };

  const handleEditContact = (contact) => {
    setIsEditingContact(true);
    setContactName(contact.name);
    setContactEmail(contact.email);
    setContactPhone(contact.phone);
    setSelectedContact(contact);
  };

  const handleUpdateContact = async () => {
    const { error } = await supabase
      .from('contacts')
      .update({
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
      })
      .eq('id', selectedContact.id);
    if (error) console.error(error);
    setIsEditingContact(false);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setSelectedContact(null);
  };

  const handleDeleteContact = async (contactId) => {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', contactId);
    if (error) console.error(error);
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  return (
    <div>
      <h2>Your Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.email} - {contact.phone}{' '}
            <button onClick={() => handleContactClick(contact)}>View User</button>{' '}
            <button onClick={() => handleEditContact(contact)}>Edit User</button>{' '}
            <button onClick={() => handleDeleteContact(contact.id)}>Delete User</button>
          </li>
        ))}
      </ul>

      {isEditingContact && (
        <div>
          <h4>Edit Contact</h4>
          <form>
            <label>Name</label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="text"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
            <button type="button" onClick={handleUpdateContact}>
              Save
            </button>
            <button type="button" onClick={() => setIsEditingContact(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {selectedUser && (
        <View user={selectedUser} closeView={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default ContactList;
