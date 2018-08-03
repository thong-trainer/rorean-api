const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');

module.exports = function(passport) {

  passport.use(new BearerStrategy({},
    function(token, done) {
      User.findOne({active: true}, function(err, user) {
        if (!user)
          return done(null, false);

        return done(null, user);
      });
    }));

}
