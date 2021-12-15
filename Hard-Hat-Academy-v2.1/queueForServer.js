const express = require('express')
const router = express.Router()

const seed = (req, res) => {
	const seedData = require('../models/seed')
	db.Favorite.create(seedData, (err, createdData) => {
		if (err) return res.status(400).json({error: err})
		res.status(200).json(createdData)
	})
}
module.exports = {
	index,
	create,
	update,
	destroy,
	seed,
}