const express = require('express')
const router = express.Router()
const VideoQueue = require('../models/videoQueue')

router.put('/users/addvideo/:name/:videourl', (req, res) => {
    if(req.session.currentUser) {
        try{
            Users.findOneAndUpdate({username: req.session.currentUser.username},
            {                    
                $push: {
                    queue: {
                        name: req.params.name,
                        videoUrl: req.params.videourl,
                        hasWatched: false    
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
    if(req.session.currentUser) {
        try{
            VideoQueue.findOne({username: req.session.currentUser.username}, (err, allVideos) => {
            // ? is equal to if error then output error msg
            err ? res.send(err)
            // : is equal to else...
            : res.render('videoQueue.ejs', {
                videoArray: allVideos
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

router.put('/users/deletevideo', (req, res) => {
        if(req.session.currentUser) {
            try{
                Users.findOneAndUpdate({username: req.session.currentUser.username},
                {   
                    
                // exports.destroyLink = function(req, res) {
                // Node.findByIdAndUpdate(
                //     req.params.id, { $pull: { "configuration.links": { _id: req.params.linkId } } }, { safe: true, upsert: true },
                //     function(err, node) {
                //         if (err) { return handleError(res, err); }
                //         return res.status(200).json(node.configuration.links);
                //     });
                // };
                 
                    $pull: {
                        queue: {
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
    




        // Added 12/16
//     Users.findByIdAndDelete({username: req.session.currentUser.username},
//         {                    
//             $push: {
//                 queue: {
//                     name: "Welding",
//                     videoUrl: "https://www.youtube.com/embed/qggvdb8_xB8",

//                 }
//             }
//         },
//             {new:true},
//             (err, userQueue) => {
//                 err ? res.send(err)
//                 : res.redirect('/')
//             })
//     }
//     catch (err) {
//         res.send(err.message)
//     }
//     } else {
//         res.redirect('/')
//     }
// })
