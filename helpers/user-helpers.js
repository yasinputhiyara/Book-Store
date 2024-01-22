var db=require('../config/connection');
var collection=require('../config/collection');
const bcrypt=require('bcrypt');

module.exports={
    // doSignup:(userData)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         userData.password=bcrypt.hash(userData.password,10)
    //         db(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
    //             resolve(data.ops[0])
    //         })
    //     })
    // }
} 