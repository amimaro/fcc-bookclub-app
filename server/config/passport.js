const User = require('../model/user/schema');
const configAuth = require('./auth');

const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new TwitterStrategy({
      consumerKey: configAuth.twitterAuth.consumerKey,
      consumerSecret: configAuth.twitterAuth.consumerSecret,
      callbackURL: configAuth.twitterAuth.callbackURL,
      passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      process.nextTick(function() {
        if (!req.user) {
          User.findOne({
            'twitter.id': profile.id
          }, function(err, user) {
            if (err)
              return done(err);
            if (user) {
              return done(null, user);
            } else {
              let newUser = new User();
              newUser.twitter.id = profile.id;
              newUser.twitter.token = token;
              newUser.twitter.username = profile.username;
              newUser.twitter.displayName = profile.displayName;
              newUser.city = "";
              newUser.state = "";
              newUser.save(function(err) {
                if (err)
                  throw err;
                return done(null, newUser);
              });
            }
          });
        } else {
          let user = req.user;
          user.twitter.id = profile.id;
          user.twitter.token = token;
          user.twitter.username = profile.username;
          user.twitter.displayName = profile.displayName;
          user.save(function(err) {
            if (err)
              throw err;
            return done(null, user);
          });
        }
      });
    }));

};
