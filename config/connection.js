const mongoose=require ('mongoose')
const connect=mongoose.connect("mongodb://127.0.0.1:27017/bookStore",
// { useNewUrlParser: true, useUnifiedTopology: true}
);

connect.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log("Database cannot Connect",err);
});

const adminSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        reguired:true
    }
});
 
const usersSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        reguired:true
    }
});
const productSchema =new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,                                      
        required:true,
    },
    productDescription:{
        type:String,
        reguired:true
    },
    productimage: String,
    // productimage: {
    //     data: Buffer, // Use Buffer type to store binary data
    //     contentType: String // Store the content type of the image
    // }
});

const db = new mongoose.model('admin',adminSchema);
const userdb = new mongoose.model('users',usersSchema);
const productdb = new mongoose.model('products',productSchema);


module.exports = db;
module.exports = userdb
module.exports=productdb;