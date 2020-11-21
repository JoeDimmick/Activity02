import mongoose from 'mongoose'; 
import crypto from 'crypto'; //this comes automatic with node.

import { APP_SECRET, AUTH_TOKEN_EXPIRES_IN } from '../config/vars'

import jwt from 'jsonwebtoken'; //create and sign tokens.

const Schema = mongoose.Schema

let userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    hash: String,
    salt: String
})

//never store raw password. always hash passwords and store the hash.
userSchema.methods.setPassword = function(password){
    //console.log('set password in models')
    //create a string of 16 random bytes and convert to hexadecimal
    this.salt = crypto.randomBytes(16).toString('hex')
    //console.log(`Salt: ${this.salt}`)
    // use salt to hash the password obtained from the user.
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 128, 'sha512').toString('hex')
    //console.log(`hash: ${this.hash}`)
    //pbkdf2Sync(password, salt, number_of_iterations, key_length, Algorithm)
}

userSchema.methods.isValidPassword = function(password){//password validation.
    //user gives us password we hash it and store the has. when user authenticates they give us the password we hash again and compared the input with the stored password.
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 128, 'sha512').toString('hex')

    return this.hash === hash
}

//generate token that will be sent from the server to browser that will identify who the user is.
userSchema.methods.generateJWT = function(){

    let expireOn = new Date()

    expireOn.setDate(expireOn.getDate() + AUTH_TOKEN_EXPIRES_IN)

    //token signature
    return jwt.sign({
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        exp: parseInt(expireOn.getTime() / 1000)
    }, APP_SECRET)
}

export let User = mongoose.model("User", userSchema)