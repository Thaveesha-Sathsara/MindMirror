// Simple test script to verify server connection
// Run this in your browser console to test if the server is accessible

console.log('🧪 Testing server connection...');

// Test the server directly
fetch('http://localhost:3000/test')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Server is accessible:', data);
  })
  .catch(error => {
    console.error('❌ Cannot connect to server:', error);
  });

// Test the auth endpoint directly
fetch('http://localhost:3000/auth/google')
  .then(response => {
    console.log('✅ Auth endpoint is accessible, status:', response.status);
    if (response.redirected) {
      console.log('🔗 Redirected to:', response.url);
    }
  })
  .catch(error => {
    console.error('❌ Cannot connect to auth endpoint:', error);
  });
