// Required by Webpack - do not touch
// require.context('../', true, /\.(html|json|txt|dat)$/i)
require('../favicon.ico')
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)


import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import ContactForm from './components/ContactForm'

if(document.getElementById('main')){ //if the returned div from views has the id of main
    ReactDOM.render(<App/>, document.getElementById('main')) // load the main content
}else if(document.getElementById('contact')){// if the returned div from views has the id of contanct
    ReactDOM.render(<ContactForm/>, document.getElementById('contact'))//load the contact content
}
