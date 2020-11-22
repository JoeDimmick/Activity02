  import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let reviewSchema = new Schema({
	comment: String,
	posted_at: Date
});

let movieSchema = new Schema({
	//id : Number,
	title: String,
	plot: String,
	poster: String,
	rated: String,
	rating: Number,
	votes: Number,
	genre: String,
	year: Number,
	imdbID: String,	
	releaseDate: Date,
	reviews: [ reviewSchema ],
	added_at: Date,
	updated_at: Date,
	added_by: {type: Schema.Types.ObjectId,  ref: "User"} //adds a field to track who added a document.
});

movieSchema.virtual('id').get(function(){
	return this._id.toHexString();
})

movieSchema.set('toJSON', {
	virtuals: true,
	transform: (doc, ret, options) => {
		delete ret.__v
		delete ret._id
	}
})
export let Movie = mongoose.model("Movie", movieSchema)