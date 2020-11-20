//tell passport how to authenticate with the user schema using the local strategy
const LocalStrategy = require('passport-local').Strategy
import { User } from '../models/user'

export const strategy = new LocalStrategy(
    function(username, password, done){ //done is a function that passport provides, we use it to report back the status of the authentication.
        User.findOne({username: username}, (err, user) => {//find the user in the user document (mongo)
            if(err){
                return done(err);//err will be null if the user was found. if there is an error just report it.
            }else{
                if(!user){
                    return done(null, false, {message: "User not found"}) //Query was successfull but user is not in the document. done(error, user, message)
                }else{
                    if(!user.isValidPassword(password)){//User was found check if the password is valid using the function defined in the user schema
                        return done(null, false, {message: "Incorrect password"})//password is not valid report the message (error is null, user false, message to send)
                    }else{
                        return done(null, user)//if password is valid return the user.
                    }
                }
            }
        })
    }
)
//Configure this startegy in server.js