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

    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Valid e-mail Required").required("Required"),
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
})

export default function SignUpForm(){
  
    //validating form with just useFormik
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({//hook, function that takes 3 arguments. initialvalues, validation function, submition values (a button submit)
        initialValues :{
            firstName: "",
            lastName:"",
            email: "",
            username:"",
            password: ""
        },
        validationSchema,
        onSubmit(values){//we want to send a post request to the server to store the message that is being submitted using fetch()
            fetch('/api/users/register', {
                method: "POST", //use POST this is a form
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin', //property that instructs the browser to send the token cookie along with every request.
                body: JSON.stringify(values)
            }).then((response) => {
                //console.log(error)
                if(!response.ok) throw Error('Failed to register')
                return response.text()
            }).then(() => {
                toast('Successfully registered', {
                    onClose: () =>{
                        document.location = "/movies"
                    }
                })
            }).catch((error) => {
                toast('Failed to register', {
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
        <h1>Sign Up</h1>
        <div className = "field">
            <label htmlFor= "firstName">First Name</label>
            <div className="control">
                <input type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleChange}/>
                <VHelp message={errors.firstName}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= "lastName">Last Name</label>
            <div className="control">
                <input type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleChange}/>
                <VHelp message={errors.lastName}/>
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
            <label htmlFor= "username">Username</label>
            <div className="control">
                <input type="text" name="username" id="username" value={values.username} onChange={handleChange}/>
                <VHelp message={errors.username}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= "password">Password</label>
            <div className="control">
                <input type="password" name="password" id="password" value={values.password} onChange={handleChange}/>
                <VHelp message={errors.password}/>
            </div>
        </div>
        <div className = "field">
            <label htmlFor= ""></label>
            <div className="control">
                <button className="primary" type="submit">Submit</button>
                <button className="primary"onClick={() =>document.location = '/movies'}>Cancel</button>
            </div>
        </div>
    </form>
    )
}