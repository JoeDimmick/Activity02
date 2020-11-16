import express from 'express'

import {indexPage, aboutPage, contactPage} from '../controllers/index'
import { contactAPI } from '../controllers/contacts'
import {allMoviesAPI, createMovieAPI, oneMovieAPI, updateMovieAPI, deleteMovieAPI} from '../controllers/movies'

let router = express.Router()

export function configureRoutes(app){ // this function needs to be called inside our server under Routing.
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/movies*', indexPage)

    // Movies API Endpionts
    router.get('/api/movies', allMoviesAPI ) // GET for finding a document
    router.get('/api/movies/:id', oneMovieAPI ) 
    router.post('/api/movies', createMovieAPI ) // POST creates a new document
    router.put('/api/movies/:id', updateMovieAPI ) // PUT edits or updates a document
    router.delete('/api/movies/:id', deleteMovieAPI ) // DELETE deletes a document
    router.post('/api/contact', contactAPI )

    app.use('/', router)
}