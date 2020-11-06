
//Hooks api, the power of React. dynamically changes the site based on user inputs.
import React, { createContext, useEffect, useState } from 'react'
//An Object-Like component that represents a movie.
import Movie from './Movie'
//List of top10 movies. JSON obj basically an array of objects
//import { top10 } from '../top10' -- using top10.dat now not top10.js
//Handles navigation between pages. This is a single page site Route allows the illusion of multiple pages.
import {Route, Switch, Link, Redirect, useHistory} from 'react-router-dom'
//pages ive written in the components, import for each function (page)
import { About, ErrorNotFound, SignupForm } from './Pages'
//movieform page written by me in the compents
import MovieForm from './MovieForm'
import { date } from 'yup'
//import SignupForm from './SignupForm'

export const MovieContext = createContext() //allows me to share the state with other components. the provider of the contract.

export default function MovieList(){
    
    const [movies, setMovies] = useState(); //deconstruction. Usestate returns an array
    const history = useHistory()

    useEffect(()=> {
        if(!movies){ // only runs the fetch if movies have not been loaded yet.
            fetch('/api/movies')
            .then(response => response.text())
            .then((data)=> {
                setMovies(JSON.parse(data, (key, value) =>{
                    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
                    if(typeof value === 'string' && dateFormat.test(value)){
                        return new Date(value)
                    }
                    return value
                }))
            })
            .catch(console.error)
        }
    },8000)
    // useEffect(()=> {
    //     fetch('/api/movies')
    //     .then(response => response.text()) // this is what happens when the fetch is successfull can have any number of .then
    //     .then((data) => {//fetching data as a text response.
    //         setMovies(JSON.parse(data, (key, value) => {//parsing the data with JSON.parse and catching any dates
    //             const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/                
    //             if(typeof value === 'string' && dateFormat.test(value)){
    //                 return new Date(value) // returns any strings that match a date formate and returning a Date object with the same value.
    //             }
    //             return value // if the string is not a date just return the value of the string. Basically catching just the date otherwise pass the string on.
    //         }))
    //     })
    //     .catch(console.error) // if the promise is not successfull.
    // })

    if(!movies) return <p>Loading ...</p>

    return (        
        <MovieContext.Provider value={{movies, setMovies}}>{/*any component in the MovieContext has access to the state. MovieContext is the 'provider' of the state*/}
            <div className="pull-content-right">
                <Route path = "/movies">
                    <button className="primary" onClick={ 
                        () => {
                            movies.sort((a, b) => a.rating - b.rating)
                            setMovies(movies.map(m => m))
                        }

                    }>Sort</button>

                    <button className="primary" onClick={ () =>  history.push('/movies/new') }>Add Movie</button>
                </Route>
            </div>               
            <main>
                <Switch>  {/* Similar to a switch case. */}
                    {/*Like button*/}
                    <Route exact path="/movies">
                        {movies.map((m, i) => {
                        return <Movie key={m.id} movie={m} onLike= {
                            () => {
                                movies[i].likes = movies[i].likes ? movies[i].likes + 1 : 1
                                {/*Set the likes of a move equal to the current likes +1 if no likes then set to 1*/}
                                setMovies(movies.map(m => m))
                            }
                        }/>
                        })}
                    </Route>
                    <Route path="/movies/new"><MovieForm></MovieForm></Route>
                    {/* 
                    this url needs to specifiy which movie to edit 
                    mid means I am editing this movie (m) with this id (mid).
                    when this route is called the actual id of the movie will replace 'mid'.
                    facilitates editing a movie form based on the movie id.
                    */}
                    <Route path="/movies/:mid/edit"><MovieForm></MovieForm></Route>{/*routes to the new movie form*/}
                    <Route path="/signup"><SignupForm></SignupForm></Route>
                    <Redirect from="" to="/movies"/>                    
                    {/*similar to fall through on a switch case. if none of the above cases match then page not found error view*/}
                    <Route path="*"><ErrorNotFound></ErrorNotFound></Route>                    
                </Switch>
            </main>           
        </MovieContext.Provider>
    )
}//end MovieList