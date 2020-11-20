import express from 'express'

import {indexPage, aboutPage, contactPage} from '../controllers/index'
import { contactAPI } from '../controllers/contacts'
import {allMoviesAPI, createMovieAPI, oneMovieAPI, updateMovieAPI, deleteMovieAPI} from '../controllers/movies'
import { registerUserAPI, signUserInAPI } from '../controllers/users'
import {jwt} from 'jsonwebtoken'
import { APP_SECRET } from './vars'
let router = express.Router()

function isSignedIn(req){
    try{
        jwt.verify(req.headers.authorization.split(' '[1]), APP_SECRET) // try and get the username from jwt webtoken
        return true // verified user is signed in
    }catch(err){ //if we cant verify with web token try to verify with the cookie
        try{
            jwt.verify(req.cookies.token, APP_SECRET)
            return true // verified user is signed in
        }catch(err){
            return false // user is not signed in
        }
    }
}

// this function needs to be called inside our server under Routing.
export function configureRoutes(app){// '*' makes this available for all requests to see if a user is signed in or not
    app.all('*', (req, res, next)=>{
        app.locals.signedIn = isSignedIn(req)
        next()
    })  
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/movies*', indexPage)
    router.get('/register', indexPage)//route for when you refresh the login/registration page you will not get 'not found page'
    router.get('/signin', indexPage)
    // Movies API Endpionts
    router.get('/api/movies', allMoviesAPI ) // GET for finding a document
    router.get('/api/movies/:id', oneMovieAPI ) 
    router.post('/api/movies', createMovieAPI ) // POST creates a new document
    router.put('/api/movies/:id', updateMovieAPI ) // PUT edits or updates a document
    router.delete('/api/movies/:id', deleteMovieAPI ) // DELETE deletes a document

    app.use('/', router)

    // users
    router.post('/api/users/register', registerUserAPI);//remember to import
    router.post('/api/users/signin', signUserInAPI);
    router.post('/api/contact', contactAPI);
}