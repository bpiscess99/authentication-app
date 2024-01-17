const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            res.status(401);
            throw new Error("Not authorized, Please login");
        }
    
        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
    
        // Get User ID from token
        const user = await User.findById(verified.id).select("-password");
    
        if(!user){
            res.status(404);
            throw new Error("User not found");
        }
        if(user.role === "suspended"){
            res.status(400);
            throw new Error("User suspended, Please contact support");
        }
    
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, Please login")
    }
   
});

// Verified Only 
const verifiedOnly = asyncHandler(async(req, res, next) => {
    if(req.user && req.user.isVerified){
       next();
    }else{
        res.status(401);
        throw new Error("Not authorized, account not verified");
    }
});

// Authorized Only
const authorOnly = asyncHandler(async(req, res, next) => {
    if(req.user.role === "author" || req.user.role === "admin"){
        next();
    }else{
        res.status(404);
        throw new Error("Not authorized as an author")
    }
}); 

// Admin Only 
const adminOnly = asyncHandler(async(req, res, next) => {
    if(req.user && req.user.role === 'admin'){
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
});


module.exports = {
    protect,
    verifiedOnly,
    authorOnly,
    adminOnly
}