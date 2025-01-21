import React from 'react';
import AddGroupForm from './AddGroupForm';
import GroupList from './GroupList';

const Groups = ({ session }) => (
  <div>
    <h2>Groups</h2>
    <AddGroupForm session={session} />
    <GroupList session={session} />
  </div>
);

export default Groups;
