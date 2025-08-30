import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setError(null);
      const response = await fetch('/api/user/me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else if (response.status === 401) {
        // User is not authenticated - this is normal
        setUser(null);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setError('Failed to check authentication status');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    setError(null);
    console.log('🔐 Initiating Google OAuth login...');
    
    // Get the server URL from environment or use default
    const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';
    
    // Redirect to Google OAuth on the server
    window.location.href = `${serverUrl}/auth/google`;
  };

  const logout = async () => {
    try {
      setError(null);
      const response = await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setUser(null);
        console.log('✅ Logged out successfully');
        // Redirect to login page
        window.location.href = '/login';
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Failed to logout');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
