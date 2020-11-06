import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik' //popular package for handling forms in React. npm install formik
import * as yup from 'yup' //npm install yup, validation package
import { toast } from 'react-toastify' // package that allows us to display some cool little alter messages.
import 'react-toastify/dist/ReactToastify.css'//npm install react-toastify
import 'react-datepicker/dist/react-datepicker.css'

toast.configure()

export function VHelp({message}){//takes only the message property from the props object.
    return <p className="help">{message}</p>
}

const validationSchema = yup.object({

    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required()
})

export default function ContactForm(){
  
    //validating form with just useFormik
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({//hook, function that takes 3 arguments. initialvalues, validation function, submition values (a button submit)
        initialValues :{
            name: "",
            email: "",
            message: ""
        },
        validationSchema,
        onSubmit(values){//we want to send a post request to the server to store the message that is being submitted using fetch()
            fetch('/api/contact', {
                method: "POST", //use POST this is a form
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
        <h1> Contact us</h1>
        <div className = "field">
            <label htmlFor= "name">Name</label>
            <div className="control">
                <input type="text" name="name" id="name" value={values.name} onChange={handleChange}/>
                <VHelp message={errors.name}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= "email">Email</label>
            <div className="control">
                <textarea type="text" name="email" id="email" value={values.email} onChange={handleChange}/>
                <VHelp message={errors.email}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= "message">Message</label>
            <div className="control">
                <textarea type="text" name="message" id="message" value={values.message} onChange={handleChange}/>
                <VHelp message={errors.message}/>
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