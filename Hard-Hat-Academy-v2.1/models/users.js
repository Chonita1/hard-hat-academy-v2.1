const mongoose = require('mongoose')

// revised userSchema - removed required from careerGoals & desirecOccupation
// because some users will be early in career exploration/undecided

//creates a shorthand for mongoose
const usersSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8},
    profile: {type: String, required: true},
    currentOccupation: {type: String},
    careerGoals: {type: String},
    email: {type: String, required: true, unique: true},
    zipcode: {type: String, required: true},
    state: {type: String, required: true},
    pictureUrl: {type: String},
    desiredOccupation: {type: String}
},
{collection: 'Users'},
{timestamps: true}
)
module.exports = usersSchema