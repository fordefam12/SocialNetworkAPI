const {Schema, model} = require("mongoose");
const { stringify } = require("uuid");

const UserSchema = new Schema(
    {
        username:{
            type:String,
            unique:true,
            trim:true,
            required: "Username is Required",
        },
        email: {
            type:String,
            unique:true,
            required: "Username is Requieed",
            match: [/.+@.+\..+/],
        }
    }
)