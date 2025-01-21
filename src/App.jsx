import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Contacts from './components/Contacts';
import Groups from './components/Groups';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div>
        <h1>Contact Book</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to your Contact Book</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      <Groups session={session} />
      <Contacts session={session} />
    </div>
  );
};

export default App;
