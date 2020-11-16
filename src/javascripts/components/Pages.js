import React from 'react'
import { useFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';


export function About(){
    return (
        <>
            <h1>About this lis</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </>
    )     
}

export function ErrorNotFound(){
    return(
        <div>
            <h1>Page not found</h1>
        </div>
    )
}

export function SignupForm (){
    //formik user 'object' has 3 fields, first name, last name, email
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName:'',
            email: '',
        },

        //validate, // calls the custom validate function above.
        
        //validation using Yup
        validationSchema: Yup.object({
            //Formik has a special configuration option / prop for Yup called 'validationSchema' which will automatically
            //transform Yup's validation errors messages into a pretty object whose keys match values/initialValues/touched
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2)); // accepts the values in the input when the submit is clicked and displays the inputs in an alert.
        },

    });
    
    return ( // the email sign up form
        <div className="emailform">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor ="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}//Formik keeps track of which fields have been visited. stores that information in an
                    //object called 'touched' that mirrors the shape of values/initialValues but each key can only be boolean t/f.
                    //to take advantage of 'touched', we pass formik.handleblue to each input's onblue prop. This function works similarly to
                    //formik.handleChange in that it uses the name attribute to figure out which field to update.
                    value={formik.values.firstName}
                />
                {/*displays an error if the validate function fails and the field was touched. by checking if the errors array is null.*/}
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}
                <label htmlFor ="lastName">Last Name</label>
                <input id="lastName" type="text" {...formik.getFieldProps('lastName')} />
                    {/*Using the useFormik() helper method called formik.getFieldProps() to wire up the inputs. We dont need this stuff below.
                    //id="lastName"
                    //name="lastName" 
                    //type="text"
                    //onChange={formik.handleChange} 
                    //onBlur={formik.handleBlur}
                    //value={formik.values.lastName}
                    />*/}
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                ) : null}
                <label htmlFor ="email">Email Address</label>
                <input id="email" type="email" {...formik.getFieldProps('email')}/>
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <button className="primary" type="submit">Submit</button>
            </form>
        </div>
    );
};