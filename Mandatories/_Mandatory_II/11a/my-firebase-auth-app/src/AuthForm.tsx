import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

const AuthForm: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let userCredential;

      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      setUser(userCredential.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {user ? (
        <>
          <p style={{ color: 'green' }}>
            You are logged in as: <strong>{user.email}</strong>
          </p>
          <button onClick={handleLogout} style={{ width: '100%', padding: '10px', marginTop: '1rem' }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ display: 'block', marginBottom: '10px', width: '100%' }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ display: 'block', marginBottom: '10px', width: '100%' }}
            />
            <button type="submit" style={{ width: '100%', padding: '10px' }}>
              {isRegistering ? 'Create Account' : 'Login'}
            </button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default AuthForm;
