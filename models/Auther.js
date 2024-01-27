const mongoose=require("mongoose");
const joi=require("joi");

const AutherSchema=new  mongoose.Schema({

    firstName:{
        type:String,
        trim:true,
        minlenght:3,
        maxlenght:10
    },
    lastName:{
        type:String,
        trim:true,
        minlenght:3,
        maxlenght:10
    },
    nationality:{
        type:String,
        trim:true,
        minlenght:7,
        maxlenght:20
    },
    age:{
        type:String,
        trim:true,
        minlenght:1,
        maxlenght:3

    }

});

const Auther = mongoose.model("Auther",AutherSchema);

function updateAuthers(obj){

        const schema=joi.object({
            
            firstName:joi.string().min(3).max(10),
            lastName:joi.string().min(3).max(10),
            natunality:joi.string().min(7).max(20),
            age:joi.number()
        });
        return schema.validate(obj);
    };

function createAnewAuthers(obj){

        const schema=joi.object({

            firstName:joi.string().min(3).max(10),
            lastName:joi.string().min(3).max(10),
            natunality:joi.string().min(7).max(20),
            age:joi.number()

        });
        return schema.validate(obj);
}

module.exports={
    Auther,
    updateAuthers,
    createAnewAuthers
}

