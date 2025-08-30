import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login, loading, error, clearError } = useAuth();
  const [searchParams] = useSearchParams();
  const authError = searchParams.get('error');

  useEffect(() => {
    // Clear any existing errors when component mounts
    clearError();
  }, [clearError]);

  const handleLogin = () => {
    clearError();
    login();
  };

  if (loading) {
    return <div className="login-loading">
      {/* Use the public folder path */}
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="loading-logo" />
      <p>Loading...</p>
    </div>;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div><img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="logo-login" /></div>
        <h1>Welcome to MindMirror</h1>
        <p>Your journey to clarity starts here.</p>
        
        {/* Show authentication errors */}
        {(error || authError) && (
          <div className="login-error">
            <p>⚠️ {error || (authError === 'no_user' ? 'Authentication failed. Please try again.' : 'An error occurred during login.')}</p>
            <button onClick={clearError} className="clear-error-btn">
              Clear Error
            </button>
          </div>
        )}
        
        <button 
          className="google-login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          <img 
            src="https://developers.google.com/identity/images/g-logo.png" 
            alt="Google" 
            className="google-icon"
          />
          Sign in with Google
        </button>
        
        <p className="login-description">
          Unlock a moment for yourself. Pause, reflect, and let your mind wander through a safe space of understanding.
        </p>
      </div>
    </div>
  );
};

export default Login;
