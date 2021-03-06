import React, { createContext, useEffect, useState } from 'react'
import Movie from './Movie'
import {Route, Switch, Link, Redirect, useHistory} from 'react-router-dom'
import { About, ErrorNotFound, SignupForm } from './Pages'
import MovieForm from './MovieForm'
import {useCookies} from "react-cookie";

export const MovieContext = createContext() //allows me to share the state with other components. the provider of the contract.

export default function MovieList(){
    
    const [movies, setMovies] = useState(); //deconstruction. Usestate returns an array
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    let [authenticated, setAuthenticated] = useState(cookie.token !== undefined) //if the cookie has been given a file you are authenticated.
    const history = useHistory()

    useEffect(()=> {
        if(!movies){
            fetch('/api/movies',{
                credentials: 'same-origin', //property that instructs the browser to send the token cookie along with every request.
            })
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
    }/*,8000*/)

    if(!movies) return <p>Loading ...</p>

    return (        
        <MovieContext.Provider value={{movies, setMovies, authenticated, setAuthenticated}}>
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
                <Switch>  
                    <Route exact path="/movies">
                        {movies.map((m, i) => {
                        return <Movie key={m.id} movie={m} onLike= {
                            () => {
                                movies[i].likes = movies[i].likes ? movies[i].likes + 1 : 1
                                setMovies(movies.map(m => m))
                            }
                        }/>
                        })}
                    </Route>
                    <Route path="/movies/new"><MovieForm></MovieForm></Route>
                    <Route path="/movies/:mid/edit"><MovieForm></MovieForm></Route>
                    <Route path="/signup"><SignupForm></SignupForm></Route>
                    <Redirect from="" to="/movies"/>                    
                    <Route path="*"><ErrorNotFound></ErrorNotFound></Route>                    
                </Switch>
            </main>           
        </MovieContext.Provider>
    )
}//end MovieList