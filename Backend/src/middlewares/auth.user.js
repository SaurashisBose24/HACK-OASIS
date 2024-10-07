import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import jwt from  "jsonwebtoken";

const verifyJWT = asynchandler(async(req,_,next)=>{
    
        const token = req.cookies?.accessToken
        if(!token)
            throw new ApiError(401,"Unauthorised request");
        const decodedToken = jwt.verify(token,"hello");
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if(!user)
            throw new ApiError(401,"Invalid access token");
        req.user = user;
        next()
})

export default verifyJWT
