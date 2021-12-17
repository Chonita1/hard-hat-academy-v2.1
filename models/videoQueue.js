const mongoose = require('mongoose')
const { model, Schema } = mongoose

const videoQueueSchema = new mongoose.Schema({
	username: {type: String, required: true},
	videoQueue: {type: Array, default: []}
},
{collection: 'VideoQueue'},
{timestamps: true}
)

const { db } = require("./occupationalData")
 



module.exports = model('videoQueue', videoQueueSchema)