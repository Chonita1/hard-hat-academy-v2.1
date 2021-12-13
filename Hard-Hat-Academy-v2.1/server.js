require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override')
const SESSION_SECRET = process.env.SESSION_SECRET
const session = require('express-session')
const bodyParser = require('body-parser')
const expertsController = require('./controllers/expertsController')
const usersController = require('./controllers/usersController')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
//async recommended in bcrypt documentation

// const saltRounds - someOtherPlain... not part of GA lesson
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';


// we required express up above now we need to call our app
const app = express();
app.use(express.static('public'))

const mongoose = require('mongoose');
const Occupations = require('./models/occupationalData');
const seedOccupationalData = require('./models/seedOccupationalData');

//this is the db port
const PORT = process.env.PORT || 3000
const SERVER_URL = process.env.SERVER_URL || "localhost:3000"

//Connect to Database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/hardhat'  //process.env.MONGODB_URI
const db = mongoose.connection

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("THE DATABASE IS CONNECTED")
})

db.on('connected', () => {
    console.log('mongoose connect to', process.env.MONGODB_URI);
})

db.on('disconnect', () => {
    console.log('mongoose disconnected to', MONGODB_URI);
})
db.on('error', (error) => {
    console.log('mongoose error', error);
})

// middleware
app.use(methodOverride('_method'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret:'Admin Only', name:'adminSessionID', saveUninitialized:false
}))
// This is from GA - do I need both Admin Only and this one?
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUnitialized: false,
    })
)


// for ejs templates
app.set('view engine', 'ejs');

app.use('/', expertsController)
app.use('/', usersController)


app.get('/', (req, res) => {
    res.redirect('/exploreoccupations')
})

app.get('/expertdata', async (req, res) => {
    if(req.session.loggedIn) {
        await Occupations.insertMany(seedOccupationalData)
        res.send('Occupational Data')        
    } else {
        res.redirect('/exploreoccupations')
    }
    

})

app.post('/authenticate', (req, res) => {
    if(req.body.username === 'Test' && req.body.password === 'password1') {
        req.session.loggedIn = true
        res.redirect('/exploreoccupations')
    } else {
        res.sendStatus(401)
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy((err) => {})
    res.redirect('/exploreoccupations')
})



app.listen(PORT, () => {
    console.log(`listening at port: ${PORT}`)
})