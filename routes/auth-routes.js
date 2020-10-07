const router=require("express").Router();
const passport=require('passport');

/* -------------------------------------------------------------------------- */
/*                            deal wiht get request                           */
/* -------------------------------------------------------------------------- */

/* ------------------------------- auth login ------------------------------- */
router.get("/login",(req,res)=>{
    res.render('login',{user:req.user});
});

/* ------------------------------- auth logOut ------------------------------ */
router.get("/logout",(req,res)=>{
   // res.send('logging out')
   req.logOut();
   res.redirect('/')
});

/* ---------------------------- auth with google ---------------------------- */
router.get("/google",passport.authenticate("google",{
    scope:['profile']
}));

/* ----------------------------------- -- ----------------------------------- */
/* ------------------------ deal with google redirect ----------------------- */
router.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
   if(req.user){
       res.render('profile',{user:req.user});
   }
   else{
       res.redirect("/")
   }
});
router.get("/google/profile",(req,res)=>{
    
})
module.exports=router;
