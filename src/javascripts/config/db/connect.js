import mongoose from 'mongoose'; //mongoose allows you to work with data in mongo in an object oriented fashion.

//this file will handling connecting to the database.

//uri === the server where the mongo db server is running.
//make a distinction between development or production environment.
//development enviroment -- get the server from the environment.
export function connect(uri){    
    
    if(process.env.NODE_ENV === "production"){
        uri = process.env.MONGODB_URI
    }

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })

    //called when the connection is successfull.
    mongoose.connection.on('connected', () => {
        console.log(`Connected to ${uri}.`)
    })

    //called when an error occurs.
    mongoose.connection.on('error', (err) => {
        console.log(`Connection error ${err}.`)
    })

    //called when the connection is disconnected.
    mongoose.connection.on('disconnected', () => {
        console.log(`Disconnected from ${uri}.`)
    })
}