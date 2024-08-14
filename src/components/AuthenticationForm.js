import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from '../firebaseConfig';

const AuthenticationForm = ({ setShowAuthForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'reset'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
      } else if (authMode === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Registration successful!');
      } else if (authMode === 'reset') {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent!');
        setAuthMode('login'); // Switch back to login after reset
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logout successful!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-4 border rounded shadow-lg max-w-sm mx-auto">
      {auth.currentUser ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome, {auth.currentUser.email}</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded w-full"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          {authMode === 'reset' ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                  Reset Password
                </button>
              </form>
              <p className="mt-2">
                Remembered your password?{' '}
                <button onClick={() => setAuthMode('login')} className="text-blue-500">
                  Login
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">{authMode === 'login' ? 'Login' : 'Register'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                  {authMode === 'login' ? 'Login' : 'Register'}
                </button>
              </form>
              <p className="mt-2">
                {authMode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button onClick={() => setAuthMode('register')} className="text-blue-500">
                      Register
                    </button>
                    <br />
                    Forgot your password?{' '}
                    <button onClick={() => setAuthMode('reset')} className="text-blue-500">
                      Reset Password
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button onClick={() => setAuthMode('login')} className="text-blue-500">
                      Login
                    </button>
                  </>
                )}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthenticationForm;



