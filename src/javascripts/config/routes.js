import express from 'express'

import { indexPage, aboutPage, contactPage, signInPage, signUpPage } from '../controllers/index'
import { contactAPI } from '../controllers/contacts'
import {allMoviesAPI, createMovieAPI, oneMovieAPI, updateMovieAPI, deleteMovieAPI} from '../controllers/movies'
import { registerUserAPI, signUserInAPI } from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars'
let router = express.Router()

function isSignedIn(req){
    try{
        jwt.verify(req.cookies.token, APP_SECRET)
        return true // verified user is signed in
    }catch(err){
        return false // user is not signed in
    }
}

function requireSignedIn(req, res, next){
    if(isSignedIn(req)){
        next()
    }else{
        res.status(401)
        res.end()
    }
}

//for the 'added_by' field.
export function getCurrentUser(req){
    if(req.cookies.token){
        return jwt.decode(req.cookies.token, APP_SECRET)
    }else {
        return null
    }
}


// this function needs to be called inside our server under Routing.
export function configureRoutes(app){// '*' makes this available for all requests to see if a user is signed in or not
    app.all('*', (req, res, next)=>{
        app.locals.signedIn = isSignedIn(req)
        app.locals.currentUser = getCurrentUser(req) //allows access the current user inside .ejs files using the variable currentUser
        next()
    })

    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)    
    router.get('/signin', signInPage)
    router.get('/signup', signUpPage)

    router.get('/movies*', indexPage)
    router.get('/register', indexPage)//route for when you refresh the login/registration page you will not get 'not found page'
    router.get('/signin', indexPage)
    // Movies API Endpoints
    router.get('/api/movies', allMoviesAPI ) // GET for finding a document
    router.get('/api/movies/:id', oneMovieAPI ) 
    router.post('/api/movies', requireSignedIn, createMovieAPI ) // POST creates a new document requires user authentication.
    router.put('/api/movies/:id', requireSignedIn, updateMovieAPI ) // PUT edits or updates a document
    router.delete('/api/movies/:id', requireSignedIn, deleteMovieAPI ) // DELETE deletes a document

    app.use('/', router)

    // users
    router.post('/api/users/register', registerUserAPI);
    router.post('/api/users/signin', signUserInAPI);
    router.post('/api/contact', contactAPI);
}