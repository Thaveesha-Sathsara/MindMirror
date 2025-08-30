# 🔧 Troubleshooting Guide - Fix the 404 Error

## 🚨 **Current Issue: Cannot GET /auth/google**

This error means your server isn't running or isn't properly configured. Let's fix it step by step.

## 📋 **Step 1: Check if you have a .env file**

1. In your `server` folder, check if you have a `.env` file
2. If you don't have one, copy the template:
   ```bash
   cd server
   copy env-template.txt .env
   ```

## 🔑 **Step 2: Configure your .env file**

Edit the `.env` file and fill in these values:

```env
# MongoDB Connection String (REQUIRED)
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database

# Google OAuth Configuration (REQUIRED)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Session Configuration (REQUIRED)
SESSION_SECRET=your_random_secret_key_here_make_it_long

# Client Origin (REQUIRED)
CLIENT_ORIGIN=http://localhost:3001

# Server Port (OPTIONAL - defaults to 3000)
PORT=3000
```

## 🌐 **Step 3: Get Google OAuth Credentials**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Set Application Type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback`
7. Copy the Client ID and Client Secret to your `.env` file

## 🗄️ **Step 4: Set up MongoDB**

1. Create a MongoDB Atlas account or use local MongoDB
2. Create a database named `mindmirrorDB`
3. Update the MONGO_URI in your `.env` file

## 📦 **Step 5: Install Dependencies**

```bash
cd server
npm install
```

## 🚀 **Step 6: Start the Server**

```bash
npm run dev
```

## ✅ **Step 7: Verify Server is Running**

You should see output like:
```
Environment check:
MONGO_URI: Set
GOOGLE_CLIENT_ID: Set
GOOGLE_CLIENT_SECRET: Set
SESSION_SECRET: Set
CLIENT_ORIGIN: Set
PORT: 3000
🔐 Configuring Passport...
✅ Passport configured successfully
Mounting routes...
✅ Server listening on port 3000
🌐 Test the server: http://localhost:3000/test
🔐 Auth endpoint: http://localhost:3000/auth/google
```

## 🧪 **Step 8: Test the Server**

1. Open your browser to `http://localhost:3000/test`
2. You should see: `{"message":"Server is running!","timestamp":"..."}`

## 🌐 **Step 9: Test Authentication**

1. Open your browser to `http://localhost:3001` (React app)
2. Click "Sign in with Google"
3. You should be redirected to Google OAuth

## ❌ **Common Issues & Solutions**

### Issue: "MONGO_URI is not set"
**Solution:** Make sure your `.env` file exists and has the correct MONGO_URI

### Issue: "Google OAuth credentials are missing"
**Solution:** Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set in `.env`

### Issue: "Cannot connect to MongoDB"
**Solution:** Verify your MongoDB connection string and that MongoDB is running

### Issue: Server starts but routes don't work
**Solution:** Check that all required environment variables are set

### Issue: "Module not found" errors
**Solution:** Run `npm install` in the server directory

## 🔍 **Debug Commands**

If you're still having issues, check:

1. **Server logs** - Look for error messages in the terminal where you ran `npm run dev`
2. **Browser console** - Check for any JavaScript errors
3. **Network tab** - See what requests are being made and their responses

## 📞 **Still Need Help?**

If you're still getting the 404 error after following these steps:

1. Make sure your server is running on port 3000
2. Check that you can access `http://localhost:3000/test`
3. Verify all environment variables are set correctly
4. Check the server console for any error messages

The most common cause is missing environment variables or the server not running. Follow the steps above and you should be able to get it working! 🎯
