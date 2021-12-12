const mongoose = require('mongoose')


//creates a shorthand for mongoose
const usersSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    profile: {type: String, required: true},
    currentOccupation: {type: String, required: true},
    careerGoals: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    zipcode: {type: String, required: true},
    state: {type: String, required: true},
    pictureUrl: {type: String, required: true, unique: true},
    desiredOccupation: {type: String, required: true}
},
{ collection: 'Users'}
)
module.exports = usersSchema