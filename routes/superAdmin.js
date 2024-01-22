var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();



router.get('/', function(req, res, next) {
    
    res.render('superAdmin/dashboard');
});



router.get('/dashboard',(req,res)=>{
  res.render('superAdmin/superAdminLogin', {superadmin : true});
})

const superAdminCredentials = {
    email: "yasinputhiyara@gmail.com",
    password: "yasin123"
 };
// router.post('/superAdminLogin',(req,res)=>{
//     const { username, email, password } = req.body;
//     if (username === superAdminCredentials.username && email === superAdminCredentials.email && password === superAdminCredentials.password) {
//         res.render('/dashboard');
//     } else{
//        console.log(err);
//         res.render('superAdmin/superAdminLogin');
//     }
// })



  
module.exports = router;

 