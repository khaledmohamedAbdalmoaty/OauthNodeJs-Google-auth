const passport=require('passport');
const googleStrategy=require('passport-google-oauth20');
//clientId=736706806623-g0nqukodr0iq0526n2nicg9k0jr70n8o.apps.googleusercontent.com
//client secret=1s_KbF78m09lE7RQDt0H-pVe
const User=require('../models/user-model.js');

/* ---------------------- serialize and deserializeUser --------------------- */
passport.serializeUser((userData,done)=>{
    done(null,userData.googleid);
    //console.log("serialized")
});
passport.deserializeUser((id,done)=>{
    User.findById(id).then((userData)=>{
        done(null,userData);
        
    }).catch((err)=>{
        console.log("khaled error"+err)
    })
});

/* ------------------------------ passport.use ------------------------------ */
passport.use(
    new googleStrategy({
        //option for google start 
        callbackURL:'/auth/google/redirect',
        clientID:'736706806623-g0nqukodr0iq0526n2nicg9k0jr70n8o.apps.googleusercontent.com',
        clientSecret:'1s_KbF78m09lE7RQDt0H-pVe'
    },(accessToken,refreshToken,profile,done)=>{
        //passport ->google Strategy callback function
        User.findOne({googleid:profile.id}).then((userData)=>{
            //console.log("user is:"+userDate);
            if(userData){
                console.log("user exist:"+userData);
                done(null,userData);
                return;
            }
            else{
                const user_me=new User({
                    username:profile. displayName,
                    googleid:profile.id
                }).save().then((result)=>{
                    console.log(result)
                });   
                done(null,user_me);
            }
        })
       
        
    })
)