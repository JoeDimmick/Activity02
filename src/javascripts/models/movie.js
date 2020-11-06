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
    reviews: [ reviewSchema ],
    added_at: Date,
    updated_at: Date
})

movieSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})

//create a model out of the data.
export let Movie = mongoose.model("Movie", movieSchema)