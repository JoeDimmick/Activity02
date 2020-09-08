import React from 'react'
/*
function that displays the attributes of a movie
img card is the movie art cover
title is the title of the movie
ratings and votes
based on imdb json data object
*/

//keyword export allows the function to be exported
export function Movie(props)
{
  const m = props.movie
  return (
    <div className="card">
      <img src={m.poster} alt={m.title}/>
      <h2>{m.title}</h2>
      <p>{m.plot}</p>
      <ul className="extra">
        <li><strong>{m.rating}</strong> rating</li>
        <li><strong>{m.votes}</strong> votes</li>
        <li><button className="primary">Select</button></li>
      </ul>
    </div>
  )
}