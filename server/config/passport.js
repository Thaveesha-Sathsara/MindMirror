import pkg from "passport-google-oauth20";
import passport from "passport";
import User from "../models/User.model.js";

const { Strategy: GoogleStrategy } = pkg;

export function configurePassport() {
  console.log('🔐 Configuring Passport...');
  console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set');
  console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set');
  console.log('Google Callback URL:', process.env.GOOGLE_CALLBACK_URL || 'Not set');

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Google OAuth credentials are missing!');
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('Google OAuth callback received for user:', profile.displayName);
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            console.log('Creating new user:', profile.displayName);
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              picture: profile.photos[0].value,
            });
          } else {
            console.log('Existing user found:', user.name);
          }
          done(null, user);
        } catch (err) {
          console.error('Error in Google OAuth callback:', err);
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log('🔐 Serializing user:', user.id);
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      console.log('Deserializing user:', user?.name);
      done(null, user);
    } catch (err) {
      console.error('Error deserializing user:', err);
      done(err, null);
    }
  });

  console.log('Passport configured successfully');
  return passport;
}

export default passport;
