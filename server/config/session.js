import session from "express-session";
import MongoStore from "connect-mongo";

export function sessionMiddleware({ mongoUrl, secret }) {
  return session({
    secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: true, // This is required for SameSite=None
      sameSite: 'none', // This allows cross-origin cookie sharing
    },
  });
}