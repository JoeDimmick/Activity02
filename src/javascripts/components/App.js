import React from 'react'
import MovieList from './MovieList'
import { BrowserRouter as Router } from 'react-router-dom'

//main entery for the app.
export default function Main(){
    return (
        <Router>
            <div className="container">
                <header>
                    <h1>Top 10 Movies: Joseph Dimmick</h1>
                </header>
                <MovieList/>
            </div>
            <footer>&copy; All rights reserved</footer>
        </Router>
    ) 
}