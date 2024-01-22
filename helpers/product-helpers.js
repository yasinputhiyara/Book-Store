
const { response } = require('express');
var productdb=require('../config/connection')
const { resolve, reject } = require('promise')
const ObjectId = require('mongoose').Types.ObjectId; // Use mongoose.Types.ObjectId
module.exports={

    getAllProducts:()=>{
        return new Promise(async(resolve, reject) => {
            let products=await productdb.find({})
            resolve(products) 
        }) 
    },
    deleteProduct: (proId) => {
        return new Promise((resolve, reject) => {
            try {
                const objectId = new ObjectId(proId);
                productdb.deleteOne({ _id: objectId }).then((response) => {
                    resolve(response);
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve ,reject)=>{
           try{
               const objectId = new ObjectId(proId);
               productdb.findOne({_id: objectId}).then((product) =>{
                resolve(product)
               });
           }catch (error){
            reject(error);
           }
        });
    },
    updateProduct: (proId, proDetails) => {
        return new Promise((resolve, reject) => {
          try {
            console.log("Updating product with ID:", proId);
            console.log("New product details:", proDetails);
            const objectId = new ObjectId(proId);
            productdb
              .findByIdAndUpdate(
                { _id: objectId },
                {
                  $set: {
                    productName: proDetails.productName,
                    productDescription: proDetails.productDescription,
                    productPrice: proDetails.productPrice,
                  },
                },
                { new: true, runValidators: true }
              )
              .then((response) => {
                console.log("Product updated successfully");
                resolve(response);
              });
          } catch (error) {
            console.error('Error updating product:', error);
            reject(error);
          }
        });
      },
    


    
}