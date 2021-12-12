const express = require('express')
const router = express.Router()


const SERVER_URL = process.env.SERVER_URL || "localhost:3000"

//list/explore all occupations
router.get('/register', (req, res) => {
    res.render('users/register.ejs')
})
router.post('/createoccupation', (req, res) => {
    req.sessionID('Check your terminal!')
}
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