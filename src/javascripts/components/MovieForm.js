import React, { useContext, useState } from 'react'
//Allows MovieForm(this component) to contract use of the state hooks from ./MovieList. MovieList will need to 'provide' the contract.
import {MovieContext} from './MovieList'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik' //popular package for handling forms in React. npm install formik
import * as yup from 'yup' //npm install yup, validation package
import { toast } from 'react-toastify' // package that allows us to display some cool little alter messages.
import 'react-toastify/dist/ReactToastify.css'//npm install react-toastify
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
toast.configure()

export function VHelp({message}){//takes only the message property from the props object.
    return <p className="help">{message}</p>
}

const validationSchema = yup.object({
    year: yup.number().required("year is required").min(1900,"year needs to be greater than 1900").max(new Date().getFullYear(),"year needs to be less than current year"),
    title: yup.string().required(),
    poster: yup.string().url().required(),
    plot: yup.string().required(),
    releaseDate: yup.date().required(),
    rated: yup.string().required(),
    genre: yup.string().required()
})
export default function MovieForm(){
    let {movies, setMovies} = useContext(MovieContext) //MovieContext from './MovieList' provides a contract to use the state hooks.
    let {mid} = useParams() //hook provied by the react-router to access the id in the URL if edit movie is clicked.

    let movie = mid ? movies.find(m => m.id == mid) : {} //if mid is defined. find the movie in the movie list else create an empty object.
    let is_new = mid === undefined//bool variable true if adding a new movie, false if editing a movie

    //validating form with just useFormik
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({//hook, function that takes 3 arguments. initialvalues, validation function, submition values (a button submit)
        initialValues : is_new ? {
            title: "",
            poster: "",
            plot: "",
            releaseDate: "",
            year: new Date().getFullYear(),
            rated: "",
            genre: ""
           
        } : {...movie}, // ... spread operator
        validationSchema,
        //validating without yup
        // validate(values){
        //     let errors = {}           

        //     if(!values.title) errors.title = "Title is required"
        //     if(!values.poster) errors.poster = "Poster is required"
        //     if(!values.plot) errors.plot = "Plot is required" 
            
        //     if(!values.year || values.year < 1900 || values.year > new Date().getFullYear())
        //         errors.year = "Year is required and between 1900 and current year"

        //     if(!values.title) errors.rated = "Rated is required"
        //     if(!values.genre) errors.genre = "Genre is required"

        //     return errors
        // },
        onSubmit(values){
            if(is_new){
                let id = movies.length
                while(true){
                    let mv = movies.find(m=> m.id == id++)
                    if(mv === undefined) break
                }

                values.id = id
                movies.push(values)

            }else{
                let mv = movies.find(m => m.id == movie.id)
                Object.assign(mv, values)
            }

            setMovies([...movies])
            history.push('/movies')
            toast(is_new ? "Successfully added" : "Successfully updated")

        }
    })
    
    const history = useHistory()
    
    return(
    <form onSubmit = {handleSubmit}>
        <h1>Adding/Editing a movie</h1>
        <div className = "field">
            <label htmlFor= "title">Title</label>
            <div className="control">
                <input type="text" name="title" value={values.title} onChange={handleChange}/>
                <VHelp message={errors.title}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= "releaseDate">Release Date</label>
            <div className="control">
                <DatePicker name="releaseDate" selected={values.releaseDate} onChange={date => setFieldValue('releaseDate', date)}/>
                <VHelp message={errors.releaseDate}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= "poster">Poster</label>
            <div className="control">
                <input type="text" name="poster" value={values.poster} onChange={handleChange}/>
                <VHelp message={errors.poster}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= "plot">Plot</label>
            <div className="control">
                <textarea type="text" name="plot" value={values.plot} onChange={handleChange}/>
                <VHelp message={errors.plot}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= "year">Year</label>
            <div className="control">
                <textarea type="text" name="year" value={values.year} onChange={handleChange}/>
                <VHelp message={errors.year}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= "rated">Rated</label>
            <div className="control">
                <textarea type="text" name="rated" value={values.rated} onChange={handleChange}/>
                <VHelp message={errors.rated}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= "genre">Genre</label>
            <div className="control">
                <textarea type="text" name="genre" value={values.genre} onChange={handleChange}/>
                <VHelp message={errors.genre}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= ""></label>
            <div className="control">
                <button className="primary" type="submit">Submit</button>
                <button className="primary"onClick={() =>history.push('/movies')}>Cancel</button>
            </div>
        </div>
    </form>
    )
}