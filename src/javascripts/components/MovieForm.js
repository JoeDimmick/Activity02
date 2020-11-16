import React, { useContext, useState } from 'react'
import {MovieContext} from './MovieList'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik' 
import * as yup from 'yup' 
import { toast } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
toast.configure()

export function VHelp({message}){
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
    let {movies, setMovies} = useContext(MovieContext) 
    let {mid} = useParams() 

    let movie = mid ? movies.find(m => m.id == mid) : {}
    let is_new = mid === undefined

    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues : is_new ? {
            title: "",
            poster: "",
            plot: "",
            releaseDate: "",
            year: new Date().getFullYear(),
            rated: "",
            genre: ""
           
        } : {...movie},
        validationSchema,
        onSubmit(values){
            fetch(`/api/movies${is_new ? '' : '/' + movie.id}`, { 
                method: is_new ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(() => {
                toast('Successfully submitted', {
                    onClose: () =>{
                        document.location = "/movies"
                    }
                })
            }).catch((error) => {
                toast('Failed to submit', {
                    onClose: () => {
                        document.location = "/movies"
                    }
                })
            })
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