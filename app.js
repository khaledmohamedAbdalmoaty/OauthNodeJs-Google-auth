/* ----------------------------- getting express ---------------------------- */

const express = require('express');
//const ejs=require("ejs");
const app = express();

/* -------------------------- getting profile page -------------------------- */
const profileRoute=require('./routes/profile-routes.js')
/* ----------------------------------- requireCookieSession ----------------------------------- */
//const User=require('./models/user-model.js');
const cookieSession=require('cookie-session')

/* ---------------------------- getting password ---------------------------- */
const passport=require('passport');
const passportSetup=require('./config/passport-setup.js');//so important to add some method to password

/* -------------------------- getting routes files -------------------------- */
const auth_routes=require('./routes/auth-routes.js')

/* ---------------------------- //set listen port --------------------------- */

portNumber=process.env.Port||3000;
app.listen(portNumber, () => {
    console.log('app now listening for requests on port 3000');
});

/* ------------------------- set view engine for ejs ------------------------ */
app.set('view engine', 'ejs');

/* ------------ //app.use initialize passport for cookie session ------------ */
//you must put app.use initialie passport first app.use for routes to avoid an error
app.use(passport.initialize()); //first
app.use(passport.session());//second

/* -------------------------- //app.use for routes -------------------------- */
app.use("/auth",auth_routes);
//app.use("/profile",profileRoute);
/* ---------------------- //app.use for cookie session ---------------------- */
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:["kjdflkasjflksaflksn"]
}));

/* -------------------------------------------------------------------------- */
/*                            connect with mongoDB                            */
/* -------------------------------------------------------------------------- */
const mongoose=require("mongoose");
//const { keys } = require('lodash');
mongoose.connect("mongodb://localhost:27017/OAuth",{useNewUrlParser: true }).then(()=>{
    console.log("sussfully connect to mongo Db")
}).catch((err)=>{
    console.log("Error:"+err.message);
});

// /* -------------------------------------------------------------------------- */
// /*                           deal with get request                            */
// /* -------------------------------------------------------------------------- */

//creat a home route
app.get('/', (req, res) => {
    res.render('home');
});





// /* -------------------------------------------------------------------------- */
// /*                           deal with post request                           */
// /* -------------------------------------------------------------------------- */

