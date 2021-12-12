const mongoose = require('mongoose')


//creates a shorthand for mongoose
const expertsSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    profile: {type: String, required: true},
    occupation: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    zipcode: {type: String, required: true},
    state: {type: String, required: true},
    pictureUrl:   {type: String, required: true, unique: true}
},
{ collection: 'Experts'}
)
module.exports = expertsSchema