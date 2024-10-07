import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['MALE' , 'FEMALE']
    },
    password: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    refreshToken: {
        type: String
    }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))    return next();
    this.password = await bcrypt.hash(this.password,5);
})

userSchema.methods.isPasswordCorrect= async function(password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        "hello",
        {
            expiresIn: '1d'
        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id
        },
        "hello",
        {
            expiresIn: '10d'
        }
    )
}

export const User = mongoose.model("User",userSchema);