//Entery point for the Web app

// Required by Webpack - do not touch
// require.context('../', true, /\.(html|json|txt|dat)$/i)
require('../favicon.ico')
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)


import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App' //importing the App from components file.
import ContactForm from './components/ContactForm' //importing the contactform from the components file.

if(document.getElementById('main')){ //If the document has the element 'main' load the App component.
    ReactDOM.render(<App/>, document.getElementById('main'))
}else if(document.getElementById('contact')){//if document has contact load the contact form.
    ReactDOM.render(<ContactForm/>, document.getElementById('contact'))
}
