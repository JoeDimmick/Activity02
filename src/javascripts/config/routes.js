import express from 'express'

import {indexPage, aboutPage, contactPage} from '../controllers/index'
import { contactAPI } from '../controllers/contacts'
import {allMoviesAPI} from '../controllers/movies'

let router = express.Router()

export function configureRoutes(app){ // this function needs to be called inside our server under Routing.
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/movies*', indexPage)
    router.get('/api/movies', allMoviesAPI)
    router.post('/api/contact', contactAPI) // handles the POST Request from the Client side.

    app.use('/', router)
}