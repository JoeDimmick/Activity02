import mongoose from 'mongoose';

//Movie Schemas

const Schema = mongoose.Schema //allows the use of just Schema instead of typing mongoose.Schema evertime its needed.

let reviewSchema = new Schema({
    comment: String,
    posted_at: Date
})

let movieSchema = new Schema({
    id: Number,
    title: String,
    plot: String,
    poster: String,
    rated: String,
    rating: Number,
    votes: Number,
    genre: String,
    year: Number,
    imdbID: String,
    added_at: Date,
    updated_at: Date,
    reviews: [ reviewSchema ]
})

//create a model out of the data.
export let Movie = mongoose.model("Movie", movieSchema)