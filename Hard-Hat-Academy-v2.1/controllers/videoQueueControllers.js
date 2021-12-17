const express = require('express')
const router = express.Router()
const VideoQueue = require('../models/videoQueue')

// TODO In the next version will refactor code to router.put
router.get('/users/addvideo/:name/:videourl', (req, res) => {
    if(req.session.currentUser) {
        try{
            VideoQueue.findOneAndUpdate({username: req.session.currentUser.username},
            {                    
                $push: {
                    videoQueue: {
                        "name": req.params.name,
                        "videoUrl": req.params.videourl,
                        "hasWatched": false    
                    }
                }
            },
            {new:true},
            (err, userQueue) => {
                console.log(userQueue)
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
    if(req.session.currentUser) {
        try{
            VideoQueue.findOne({username: req.session.currentUser.username}, (err, allVideos) => {
            // ? is equal to if error then output error msg
            err ? res.send(err)
            // : is equal to else...
            : res.render('users/videoQueue.ejs', {
                videoArray: allVideos.videoQueue,
                specificProfileData: req.session.currentUser
            })
        })
        }
        catch (err) {
            res.send(err.message)
        }
    } else {
        res.redirect('/')
    }
})
// TODO In the next version will refactor code to router.put
router.get('/users/deletevideo/:name/:videourl', (req, res) => {
        if(req.session.currentUser) {
            try{
                VideoQueue.findOneAndUpdate({username: req.session.currentUser.username},
                {   
                 
                    $pull: {
                        videoQueue: {
                            name: req.params.name,
                            videoUrl: req.params.videourl,  
                        }
                    }
                },
                {safe:true, new:true},
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
    
module.exports = router 
