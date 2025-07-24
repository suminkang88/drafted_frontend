import React from 'react';
import AppRouter from './routes/Router';
import { useEffect, useState } from 'react';
import {
  useSession,
  useUser,
  SignedIn,
  SignIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
//import { createClient } from '@supabase/supabase-js';

function App() {
  return (
    <>
      <SignedIn>
        <AppRouter />;
      </SignedIn>
      <SignedOut>
        <SignIn routing="hash" />
      </SignedOut>
    </>
  );
}

export default App;
