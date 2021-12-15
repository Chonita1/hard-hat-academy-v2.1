const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const bcrypt = require('bcrypt')


const SERVER_URL = process.env.SERVER_URL || "localhost:3000"


router.get('/users/register', (req, res) => {
    res.render('users/register.ejs')
})
router.get('/users/updateprofile', (req, res) => {
    res.render('users/updateProfile.ejs')
})
router.put('/updateProfile', (req, res) => {
    if(req.session.currentUser) {
        try {
            Users.findOneAndUpdate({username: req.session.currentUser.username},
                {                    
                    summary: req.body.summary,
                    currentOccupation: req.body.currentOccupation,
                    careerGoals: req.body.careerGoals,
                    pictureUrl: req.body.pictureurl,
                    email: req.body.email,
                    state: req.body.state
                },  {new:true},
                    (err, specificProfile) => {
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

router.post('/users/register', (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)
    //check if another user already has this username
    Users.findOne({username: req.body.username}, (error, userExists) => {
        if (error) {
            res.send(error)
        } else  {
            if (userExists) {
                res.send('That username is taken')
            } else {
                Users.create(req.body, (error, createUser) => {
                    res.redirect('/')// redirecting to  homepage
                }) 
            }
        }
    })
})
router.get('/users/login', (req, res) => {
    res.render('users/login.ejs')
})
router.post('/users/login', (req, res) => {
    // need to get the user with that username if they exist.
    Users.findOne({username: req.body.username}, (error, foundUser) => {
        if (error) {
            res.send(error)
        } else if (foundUser) {
            // if they do exist, need to compare their passwords
            // compare passwords using bcrypt's compare sync   
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            //compareSunc returns true if passwords match & false if they don't
            // if the passwords match, log them in
            if (validLogin) {
                req.session.currentUser = foundUser
                // this informs the session that a user is logged in
                res.redirect('/exploreoccupations')
            // if they don't match, send a message
            } else {
                // If they don't exist/match, send a message.
                res.send('Invalid username or password')
            }
        }
    })
})

router.get('/users/showprofile', (req, res) => {
    try{
        Users.findOne({username: req.session.currentUser.username}, (error, user) => {
            error ? res.send(error)
            : res.render('users/showProfile.ejs', {
                specificProfileData: user,
                serverUrl: SERVER_URL
            })
        })
    }
    catch (err) {
        res.send(err.message)
    }
})


// Destroy Session Route
router.get('/users/logout', (req, res) => {
    req.session.destroy()
    // This destroys the session
    res.redirect('/exploreoccupations')
})
    



//list/explore all occupations
// //show a specific occupation
// router.get('/explore/:id', (req, res) => {
//     try{
//         Occupations.findById(req.params.id, (err, specificOccupation) => {
//             err ? res.send(err)
//             : res.render('show.ejs', {
//                 specificOccupationalData: specificOccupation,
//                 serverUrl: SERVER_URL
//             })
//         })
//     }
//     catch (err) {
//         res.send(err.message)
//     }
// })
// // user clicks on create occupation and gets the form
// router.get('/getnewoccupationform', (req, res) => {
//     if(req.session.loggedIn) {
//         res.render('new.ejs')
//     } else {
//         res.redirect('/exploreoccupations')
//     } 
// })

// // user actually submits form to create a new occupation
// router.post('/createoccupation', (req, res) => {
//     if(req.session.loggedIn) {
//         try{
//             Occupations.create(
//                 {
//                     title: req.body.title,
//                     description: req.body.description,
//                     training: req.body.training,
//                     wage: req.body.wage,
//                     videoUrl: req.body.videourl,
                    
//                     expert: {
//                             name: req.body.name,
//                             occupation: req.body.occupation,
//                             profile: req.body.profile,
//                             pictureUrl: req.body.pictureurl,
//                             email: req.body.email,
//                             phone: req.body.phone,
//                             zipcode: req.body.zipcode,
//                             state: req.body.state
//                     }
//                 },
//                 (err, specificOccupation) => {
//                     err ? res.send(err)
//                     : res.redirect('/exploreoccupations')
//                 })
            
//         }
//         catch (err) {
//             res.send(err.message)
//         }
//     } else {
//         res.redirect('/exploreoccupations')
//     }    
// })

// //edit an occupation
// router.get('/editoccupation/:id', (req, res) => {
//     if(req.session.loggedIn) {
//         try{
//             Occupations.findById(req.params.id, (err, specificOccupation) => {
//                 err ? res.send(err)
//                 : res.render('edit.ejs', {
//                     specificOccupationalData: specificOccupation
//                 })
//             })
//         }
//         catch (err) {
//             res.send(err.message)   
//         } 
//     } else {
//         res.redirect('/exploreoccupations')
//     }
// })

// //update an occupation.
// router.put('/updateoccupation/:id', (req, res) => {
//     if(req.session.loggedIn) {
//         try {
//             Occupations.findByIdAndUpdate(req.params.id,
//                 {
//                     title: req.body.title,
//                     description: req.body.description,
//                     training: req.body.training,
//                     wage: req.body.wage,
//                     videoUrl: req.body.videoUrl,
                    
//                     expert: {
//                             name: req.body.name,
//                             occupation: req.body.occupation,
//                             profile: req.body.profile,
//                             pictureUrl: req.body.pictureurl,
//                             email: req.body.email,
//                             phone: req.body.phone,
//                             zipcode: req.body.zipcode,
//                             state: req.body.state
//                     }
//                 },  {new:true},
//                     (err, specificOccupation) => {
//                     err ? res.send(err)
//                     : res.redirect('/explore/' + req.params.id)
//                 })    
//         }
//         catch (err) {
//             res.send(err.message)
//         }
//     } else {
//         res.redirect('/exploreoccupations')
//     }
// })

// //delete an occupation
// router.delete('/deleteoccupation/:id', (req, res) => {
//     if(req.session.loggedIn) {
//         try {
//             Occupations.findByIdAndDelete(req.params.id, function (err) {
//                 err ? res.send(err)
//                 : res.redirect('/exploreoccupations')
//             });
//         }
//         catch (err) {
//             res.send(err.message)
//         } 
//     } else {
//         res.redirect('/exploreoccupations')
//     }
// })



module.exports = router 