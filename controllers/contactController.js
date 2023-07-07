const asyncHandler =  require('express-async-handler');
const dbContact = require('../models/contactModel');

//@Get all contact 
//@route Get /api/contacts
//@access private
const getAllContatct = asyncHandler(async (req,res)=>{
    const contactData = await dbContact.find({user_id : req.user.id});
    res.status(200).json(contactData);
});

//@Get all contact 
//@route Get /api/contacts/:id
//@access private
const getContatct = asyncHandler(async (req,res)=>{
    const getContact = await dbContact.findById(req.params.id);
    if(!getContact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(getContact)
}
);

//@Get Create contact 
//@route POST /api/contacts
//@access private
const createContatct = asyncHandler(async (req,res)=>{
    console.log(req.body)
    const { name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All field are mandatory");
    }

    const createContatctData = await dbContact.create({
        name,
        email, 
        phone,
        user_id : req.user.id
    })
    res.status(201).json({message:"Contact created successfully",data:createContatctData})
});

//@Get update contact 
//@route PUT /api/contacts
//@access private
const updateContatct = asyncHandler( async (req,res)=>{
    // console.log()
    const getData = await dbContact.findById(req.params.id);
    if(!getData){
        res.status(404);
        throw new Error("Contact not found");
    }  

    if(getData.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User don't have premission to update other user contacts")
    }

    const updatedData = await dbContact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedData)
});

//@Get deleteDELETE contact 
//@route POST /api/contacts/:id
//@access private
const deleteContatct = asyncHandler( async (req,res)=>{
    const userDetail = await dbContact.findById(req.params.id);
    console.log("user details-----",userDetail);
    if(!userDetail){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(userDetail.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User don't have premission to update other user contacts")
    }
    const query = { _id: req.params.id};
    await dbContact.deleteOne(query);
    res.status(200).json(userDetail)
})

module.exports = { getAllContatct, createContatct,updateContatct,deleteContatct,getContatct }