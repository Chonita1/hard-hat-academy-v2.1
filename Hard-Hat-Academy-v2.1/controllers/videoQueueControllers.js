const express = require('express')
const router = express.Router()
const videoQueue = require('../models/videoQueue')

router.put('/users/addvideo', (req, res) => {
    if(req.session.currentUser) {
        try{
            Users.findOneAndUpdate({username: req.session.currentUser.username},
            {                    
                $push: {
                    queue: {
                        name: "Welding",
                        videoUrl: "https://www.youtube.com/embed/qggvdb8_xB8",
    
                    }
                }
            },
            {new:true},
            (err, userQueue) => {
                err ? res.send(err)
                : res.redirect('/')
            })
        }
        catch (err) {
            res.send(err.message)
        }
    } else {
        res.redirect('/')
    }
})

router.get('/users/showqueue', (req, res) => {

})

router.put('/users/deletevideo', (req, res) => {

})