const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/userModel');
const config = require('./database');

module.exports = function(passport){
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        // console.log(jwt_payload._id);
        User.getUserById(jwt_payload._id, function(err, user) {
            if(err){
                return done(err, false)
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }));
};