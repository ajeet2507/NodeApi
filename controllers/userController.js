const asyncHandler =  require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@Get Create User 
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    console.log(req.body)
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const isUserExist = await User.findOne({email});
    console.log('isUserExist************',isUserExist)
    if(isUserExist){
        res.status(400);
        throw new Error("User already registered");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    console.log('hashedPassword************',hashedPassword)
    const newUser = await User.create({
        username,
        email,
        password:hashedPassword
    })

    if(newUser){
        console.log('newUser************',newUser)
        res.status(201).json({
           message:"user register successfully"
        })
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@login user
//@router POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    const { email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userDetail = await User.findOne({email});
    if(userDetail && (await bcrypt.compare(password,userDetail.password))){
        console.log('password matched')
        const accessToken = jwt.sign({
            user:{
                username: userDetail.username,
                email : userDetail.email,
                id: userDetail.id
            }
        },process.env.ACCESS_TOKEN,
        {expiresIn:"15m"});
        res.status(200).json({
            accessToken:accessToken,
            username: userDetail.username,
            email : userDetail.email
        })
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid")
    }
})

//@Get current user
//@router GET /api/users/current
//@access public
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
})
module.exports ={ registerUser, loginUser, currentUser}