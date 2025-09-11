import session from "express-session";
import MongoStore from "connect-mongo";

export function sessionMiddleware({ mongoUrl, secret }) {
  const isProd = process.env.NODE_ENV === 'production';
  console.log(`Environment is ${isProd ? 'Production' : 'Development'}`);

  const cookieConfig = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  };

  if (isProd) {
    // For production, require secure cookies (https) and cross-site sharing.
    cookieConfig.secure = true;
    cookieConfig.sameSite = 'none';
    console.log('Production cookie config: secure=true, sameSite=none');
  } else {
    // For local development, allow insecure cookies (http).
    cookieConfig.secure = false;
    cookieConfig.sameSite = 'Lax';
    console.log('Development cookie config: secure=false, sameSite=Lax');
  }

  return session({
    secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl }),
    cookie: cookieConfig,
  });
}
