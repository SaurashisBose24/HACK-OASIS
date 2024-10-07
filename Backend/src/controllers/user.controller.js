import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const generateAccessAndRefereshTokens = async(userId) => {
    
        const user = await User.findById(userId)
        if(!user)
            throw new ApiError(401,"User not found");
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        let c = await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
    
}

const registerUser = asynchandler(async(req,res) => {
    const {username, email, gender, password, height, weight} = req.body
    const existUser = await User.findOne({email:email});
    if(existUser)
        throw new ApiError(400,"User already has account");
    const user = await User.create({
        username: username,
        email: email,
        gender: gender,
        password: password,
        height: height,
        weight: weight
    })
    const createUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createUser)
        throw new ApiError(500,"something went wrong registering the user")
    const {accessToken, RefreshToken} = await generateAccessAndRefereshTokens(createUser._id);
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", RefreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: createUser, accessToken, RefreshToken
            },
            "User logged In Successfully"
        )
    )
})

const loginUser = asynchandler(async (req,res) =>{
    const {email,password} = req.body;
    if(!email)
        throw new ApiError(400,"email required");
    const user = await User.findOne({email:email});
    if(!user)
        throw new ApiError(400,"user not found");
    const isPassword = await user.isPasswordCorrect(password);
    if(!isPassword)
        throw new ApiError(400,"Invalid credentials");
    const {accessToken, RefreshToken} = await generateAccessAndRefereshTokens(user._id);
    const loggedIn = await User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", RefreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedIn, accessToken, RefreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asynchandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const fetchUser = asynchandler(async (req,res) =>{
    const token = req.cookies?.accessToken
    if(!token)
        throw new ApiError(401,"Unauthorised request");
    const decodedToken = jwt.verify(token,"hello");
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if(!user)
         throw new ApiError(401,"Invalid access token");
    res.status(200).json(new ApiResponse(200,user,"User is present"));
})

export { registerUser, loginUser, logoutUser,fetchUser }