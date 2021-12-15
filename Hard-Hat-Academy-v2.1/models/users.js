const mongoose = require('mongoose')

// revised userSchema - removed required from careerGoals & desirecOccupation
// because some users will be early in career exploration/undecided

//creates a shorthand for mongoose
const usersSchema = new mongoose.Schema ({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8},
    summary: {type: String},
    currentOccupation: {type: String},
    careerGoals: {type: String},
    email: {type: String, required: true, unique: true},
    state: {type: String},
    pictureUrl: {type: String}
},
{collection: 'Users'},
{timestamps: true}
)
module.exports = mongoose.model('Users', usersSchema)