var express = require('express');
var router = express.Router();
// const userHelpers = require('../helpers/user-helpers')
var userdb=require ('../config/connection');
const bcrypt=require('bcrypt');
var productHelpers=require('../helpers/product-helpers');


const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next();
  }else{
    res.redirect('/login');
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user=req.session.user;
  console.log(user);
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-products', {user,products});
    
  })

});

router.get('/login',(req,res)=>{
  if(req.session.user){
    res.redirect('/')
  }else{

    res.render('user/login',{"loginErr":req.session.loginErr});
    req.session.loginErr=false;
  }
});

router.get('/signup',(req,res)=>{
  if(req.session.user){
    res.redirect('/')
  }else{

    res.render('user/signup',{"loginErr":req.session.loginErr});
    req.session.loginErr=false;
  }
  
  // res.render('user/signup',); 
});

router.post('/signup',async (req,res)=>{
  const data={
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
  }
  const existingUser = await userdb.findOne({email: data.email});
  if (existingUser){
    res.send('user Exist');
    console.log("User already Exist");
  }else{
    const saltRounds =10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;
    
    const newUser = await userdb.create(data);
    console.log(newUser);
    
    // res.locals.user = data.email;
    req.session.loggedIn=true;
    req.session.user = newUser;
    res.redirect('/'); 

  }

})
router.post('/login', async (req, res) => {
  try {
    const check = await userdb.collection.findOne({ email: req.body.email });
 
    if (!check) {
      // User not found
      req.session.loginErr="Invalid username or password";
      return res.redirect('/login');
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

    if (isPasswordMatch) {
      req.session.loggedIn=true;
      req.session.user = check;
      return res.redirect('/');
    } else {
      req.session.loginErr="Invalid username or password";
      return res.redirect('/login');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
});

router.get('/cart',verifyLogin,(req,res)=>{
  res.render('user/cart');
})

module.exports = router;

