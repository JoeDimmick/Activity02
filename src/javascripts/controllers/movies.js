import { Movie } from '../models/movie' 

//called by routes.js
//exec requires the callback function
//handle errors if failed
//flush and push data back to the browser
//if call back success write the results to a JSON
//flush to browser


export const allMoviesAPI = (req, res, next) => { 
    Movie.find().select('-reviews').exec((err, movies) =>{ 
        if(err){
            res.json({success: false, message: "Query failed"})
            res.end()
        }else{
            res.write(JSON.stringify(movies))
            res.end()
        }
    })
}