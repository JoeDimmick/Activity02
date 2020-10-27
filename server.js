import {connect} from './src/javascripts/config/db/connect'
import {Movie} from './src/javascripts/models/movie';

//console.log("hello");

connect("mongodb://localhost:27017/topmovies") //by default the mongodb localhost is 27017

Movie.find().exec((err, movies) => { //after you call Movie.Find you will get back an error or a list of movies that you requested.
    if(err){
        console.log(err)
    }else{
        console.log(movies)
    }
})