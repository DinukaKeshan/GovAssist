import dotenv from "dotenv";
dotenv.config(); // ✅ FORCE env load HERE

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User.js";

console.log("PASSPORT ENV CHECK:", {
  clientID: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_CLIENT_SECRET,
  callback: process.env.GOOGLE_CALLBACK_URL,
});
// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_, __, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: null, // 👈 ask later
          });
        }
//✅ Successfully found or created user
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);


export default passport;
