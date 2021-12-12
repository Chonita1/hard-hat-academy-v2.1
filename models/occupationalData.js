const mongoose = require('mongoose') 
const Experts = require('./experts')
const Users = require('./users')

//creates a shorthand for mongoose
// created the occupational schema for occupational title,training required, avg wage, 
//and job growth trend. 
    // I have connected experts schema to the occupatonal schema
const occupationalDataSchema = new mongoose.Schema ({
    expert: Experts,
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    training: {type: String, required: true},
    wage: {type: String, required: true},
    videoUrl:   {type: String, required: true, unique: true}
},
{ collection: 'Occupations'}
)
module.exports = mongoose.model('Occupations', occupationalDataSchema)
