import passport from 'passport'
import { User } from '../models/user'

export const registerUserAPI = ( req, res, next ) => { //collect data from the body
    console.log('registerUserAPI method hit in controllers>user')
    let user = new User
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.username = req.body.username
    user.setPassword(req.body.password)

    usersave(err => { //save the collected data to the DB.
        console.log('userSave in controlers>user.js')
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
                res.cookie("token", token, {maxAge: 1000 * 60 * 3 /* 60 * 24*/}) //package the signed token as a cookie and send it as part of the signed response.
                res.end()
            }else{
                res.status(401).json(err)//if user is not found report 401 : unauthorized error
                res.end()
            }
        }
    })(req,res, next)//authenticate will return a fucntion pass it the request, response and next
}

//set up routes for this in config > routes.