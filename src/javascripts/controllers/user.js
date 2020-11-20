import passport from 'passport'
import { User } from '../models/user'

export const registerUserAPI = ( req, res, next ) => { //collect data from the body
    let user = new User
    user.firstName = req.body.firstName
    user.lastName = req.body.firstName
    user.email = req.body.firstName
    user.username = req.body.firstName
    user.setPassword(req.body.password)

    usersave(err => { //save the collected data to the DB.
        if(err){
            res.json({success: false, message: "Unable to register user"})
            res.end()
        }else{
            res.end()
        }
    })
}

export const signUserInAPI = ( req, res, next) => {
    passport.authenticate('local', (err, user, info) => { //for sign in use the authenticate function provided by passport.
        if(err){
            res.status(404).json(err);
            res.end();
        }else{
            if(user){//generate token for user
                let token = user.generateJWT()
                res.cookie("token", token) //package the signed token as a cookie and send it as part of the signed response.
                res.json({ "token" : token })//send the cookie as a json
                res.end()
            }else{
                res.status(401).json(err)//if user is not found report 401 : unauthorized error
                res.end()
            }
        }
    })(req,res, next)//authenticate will return a fucntion pass it the request, response and next
}

//set up routes for this in config > routes.