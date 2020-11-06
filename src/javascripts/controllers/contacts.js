import { Contact } from '../models/contact' //import the contact schema

export const contactAPI = (req, res, next) => { // function that responds to the request.

    let contact = new Contact(req.body) //gets the values from the form that was saved in a body property

    contact.save(err => { // saves the contact to the DB
        if(err){
            res.json({success: false, message: "Unable to save to DB"})
            res.end()
        }else{
            res.status(200)
            res.end()
        }
    })
}