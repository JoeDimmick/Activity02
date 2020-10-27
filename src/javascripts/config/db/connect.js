import mongoose from 'mongoose'; //mongoose allows you to work with data in mongo in an object oriented fashion.

//this file will handling connecting to the database.

export function connect(uri){ //uri === the server where the mongo db server is running.
    //make a distinction between development or production environment.
    
    //development enviroment -- get the server from the environment
    if(process.env.NODE_ENV === "production"){
        uri = process.env.MONGODB_URI
    }

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true
    })

    mongoose.connection.on('connected', () => {//called when the connection is successfull.
        console.log(`Connected to ${uri}.`)
    })

    mongoose.connection.on('error', (err) => {//called when an error occurs.
        console.log(`Connection error ${err}.`)
    })

    mongoose.connection.on('disconnected', () => {//called when the connection is disconnected.
        console.log(`Disconnected from ${uri}.`)
    })
}