import React from 'react';
import AddContactForm from './AddContactForm';
import ContactList from './ContactList';

const Contacts = ({ session }) => (
  <div>
    <h2>Contacts</h2>
    <AddContactForm session={session} />
    <ContactList session={session} />
  </div>
);

export default Contacts;
