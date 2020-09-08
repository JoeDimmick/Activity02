// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// TODO
import React from 'react'
import ReactDOM from 'react-dom'

import {movies} from './movies'
import {MovieList} from './components/movie-list'

//display list of movies
//display movie card

class Main extends React.Component
{
  //All react classes need to call render() 
  //which will be a visual representation of the data 
  //think toString
  render()
  {
    //this html looking code is actually called JSX
    return <MovieList movies={movies} />
  }
}
ReactDOM.render(<Main/>, document.getElementById('main'))