const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/db");
const bcrypt = require("bcrypt");


module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField : "username" }, (username, password, done) => {
            // find a user
            db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
                
                // if there is not the user in DB
                if(result.length === 0){
                    return done(null, false, "The username is not registered"); // flash message
                }
                // if there is the user
                const user = result[0]
                const pwd = user.password; // Found password from DB
                // hash된 비밀번호와 입력된 비밀번호 비교 through bcrypt
                bcrypt.compare(password, pwd, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    } else {
                        return done(null, false, "Password is incorrect"); // flash message
                    }
                });
            });
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
            const user = result[0];
            done(err, user);       
        });
    });
}