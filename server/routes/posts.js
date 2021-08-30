const express=require('express');
const router=express.Router();
const mongoose = require("mongoose");
const PostMessage = require("./../schema/postSchema");
const auth = require("../middleware/auth")

router.get('/',async (req,res)=>{
    try{
     const messages=await PostMessage.find();
     res.status(200).send(messages);
    }catch(error){
     res.status(404).json({message:e.message});
    }
})

router.post('/',auth,async (req,res)=>{
    const message=req.body;
    const newMessage=new PostMessage({...message,creator:req.userId,createdAt:new Date().toISOString()});
    try{
    await newMessage.save();
    res.status(201).json(newMessage);
    }catch(error){
    res.status(409).json({message:e.message});
    }
})

router.patch('/:id',auth,async(req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('Invalid ObjectId');
    const updatedPost=await PostMessage.findByIdAndUpdate(_id,post,{new:true});
    // console.log('server' + data);
    res.status(200).json(updatedPost);
})

router.delete('/:id',auth,async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Invalid Post Id');
    await PostMessage.findByIdAndDelete(id);
    res.status(200).json({message:'Post Deleted Sucessfully'});
})
module.exports=router;