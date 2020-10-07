const router=require('express').Router();
// const chechUser = (req,res,next)=>{
//     if(!req.user){
//         res.redirect('/auth/login')
//     }
//     else{
//         next();
//     }
// };
router.get('/',(req,res)=>{
    res.send("you have logged in "+req.body.user.username)
});
module.exports=router;


