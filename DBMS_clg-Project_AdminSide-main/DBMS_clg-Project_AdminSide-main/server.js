const express = require('express');
// const mysql = require('mysql2');
require('dotenv').config();
const app = express();
const loginControler = require('./controlers/loginControler');
const signUpControler = require('./controlers/signUpControler');
const auth = require('./validation/authValidation');
const cookieParser = require("cookie-parser");
const connectFlash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const initPassport = require('./controlers/passportLocalControler');
const homePageControler = require('./controlers/homePageControler');
const authStation = require('./validation/authStationValidation');
const addStationsControler = require('./controlers/addStationControler');
const addRouteController = require('./controlers/addRoutesControler');
const addTrainController = require('./controlers/addTrainController');
const addpassThrough = require('./controlers/passThroughController');
const deleteTrain = require('./controlers/deleteTrainController');
const editTrain = require('./controlers/editTrain');
const getPassenger = require('./controlers/passesnger');
const deleteTicket = require('./controlers/deleteTicket');

initPassport();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUnintialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(connectFlash());
app.set("view engine", "hbs");
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'))

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tempUser',
    password: 'Khosla@2000',
    database: 'railrev2'
});


app.get('/', loginControler.checkLoggedIn, homePageControler.getHomePage)


app.get('/login', loginControler.checkLoggedOut, loginControler.getLoginPage)
app.get('/register', signUpControler.getSignUpPage)
app.post('/register', auth.validateRegister, signUpControler.creatNewUser)
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    successFlash: true,
    failureFlash: true
}))
app.post('/logout', loginControler.postLogOut);

app.get('/addStations', loginControler.checkLoggedIn, addStationsControler.showStations);
app.post('/addStations', authStation.authStationValidation, addStationsControler.createNewStation);

app.get('/addRoute', loginControler.checkLoggedIn, addRouteController.showRoutes);
app.post('/addRoute', addRouteController.createNewRoute);

app.get('/addTrain', loginControler.checkLoggedIn, addTrainController.showTrains);
app.post('/addTrain', addTrainController.createNewTrain);

app.get('/addpassThrough', loginControler.checkLoggedIn, addpassThrough.showPassThrough);
app.post('/addpassThrough', addpassThrough.createNewPassThrough);

app.post('/deleteTrain/:id', deleteTrain.getDeleteTrain);

app.get('/editTrain/:id', editTrain.GetEditForm);
app.post('/editTrain/:id', editTrain.updateTrain);

app.get('/passenger/:id', getPassenger.passengerList);
app.post('/deleteTicket/:id/:tno', deleteTicket.getDeleteTicket)

app.listen('4444', () => {
    console.log('Server Started on port 4444');
})
