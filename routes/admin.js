var express = require('express');
const path = require('path');
var bodyParser =require('body-parser');
var bcrypt =require('bcrypt');
var router = express.Router();
var db =require('../config/connection');
var productHelpers=require('../helpers/product-helpers');
const multer = require('multer');
var productdb=require('../config/connection');
const ObjectId = require('mongoose').Types.ObjectId; // Use mongoose.Types.ObjectId

 

// Multer storage configuration




/* GET home page. */

router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products', {admin:true,products});
  })
});

router.get('/add-product',(req,res)=>{
  res.render('admin/add-product');
})
//storage & file name setting
let storage = multer.diskStorage({
  destination: 'public/product-images/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

let upload = multer({ storage: storage });


 router.post('/add-product',upload.single('productimage'), async (req,res,callback)=>{
   
   const { productName, productPrice, productDescription } = req.body;
   
   try {
    const newProduct = new productdb({
        productName,
        productPrice,
        productDescription,
        productimage:req.file.filename,
        //  {
        //   data: req.file.buffer,
        //   contentType: req.file.mimetype
        // }
      });
      
  console.log(newProduct);

    await newProduct.save();
    res.redirect('/admin');
} catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Internal Server Error');
}
});

router.get('/delete-product/:id',(req,res)=>{
  
  let proId=req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin')
  })
});

router.get('/edit-product/:id', async (req,res)=>{
  let product= await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product',{product})
})

router.post('/edit-product/:id', async (req,res)=>{
  try {
    console.log("Updating product with ID:", req.params.id);
    console.log("New product details:", req.body);
    await productHelpers.updateProduct(req.params.id, req.body);
    console.log("product updated successfullly");
    res.redirect('/admin');
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
