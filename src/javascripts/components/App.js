import React from 'react'
import MovieList from './MovieList'
import { BrowserRouter as Router } from 'react-router-dom'

//main entery for the app.
export default function Main(){
    return (
        <Router>
            <MovieList/>
        </Router>
    ) 
}