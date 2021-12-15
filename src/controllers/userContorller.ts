import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { UserModel } from '../models/user/userSchema';
import { PostModel } from '../models/post/postSchema';
import { CommentModel } from '../models/comment/commentSchema';
import { LikeModel } from '../models/like/likeSchema';

exports.user_signup = async(req: Request, res: Response) => {
    try{
        // check if user's email exists
        let user = await UserModel.findOne({ email: req.body.email });
        if(user){
            return res.status(400).json(
                'Try again with another mail'
            );
        }else {
            // store the new user with the hashed password
            let hashedpassword = await bcrypt.hash(req.body.password, 10);
                    let newUser = new UserModel({
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedpassword
                    });
            await newUser.save();
            return res.status(201).json('User created successfully');
        }

    }catch(err: any){
        return res.status(400).json(err.message);
    }
}

exports.user_login = async(req: Request, res: Response) => {
    try {
        // check if the user exists 
        let user = await UserModel.findOne({ email: req.body.email });
        if(!user){
            return res.status(404).json(
                'Error with email or password'
            );
        }else{
            let isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if(!isPasswordValid) throw new Error('Login failed');

            let token = jwt.sign(
                {
                    username: user.username,
                    email: user.email,
                    _id: user._id
                },
                'secretKey123',
                { expiresIn: '7d' }
            );
            return res.status(201).json({ token });
        }
    }catch(err: any){
        return res.status(400).json(err.message);
    }
}

exports.add_a_post = async(req: Request, res: Response) => {
    try {
        let post = new PostModel({
            authorId: req.user._id,
            content: req.body.content
        });
       
        await post.save();
        return res.status(200).json(
            'You added a new post'
        );
    }catch(err: any){
        return res.status(400).json(err.message);
    }
}

exports.add_a_comment = async(req: Request, res: Response) => {
    try {
       let post = new CommentModel({
           authorId: req.user._id,
           postId: req.body.postId,
           content: req.body.content
       });
       
       await post.save();
       return res.status(200).json(
           'You commented on this post'
       );
    }catch(err: any){
        return res.status(400).json(err.message);
    }
}

exports.add_a_like = async(req: Request, res: Response) => {
    try {
       let post = new LikeModel({
           likeAuthorId: req.user._id,
           postId: req.body.postId,
           content: req.body.content
       });
       
       await post.save();
       return res.status(200).json(
           'You liked this post'
       );
    }catch(err: any){
        return res.status(400).json(err.message);
    }
}

exports.soft_delete_accout = async(req: Request, res: Response) => {
    try{
        let user = await UserModel.findOne({ req.user.email });
        user.isSoftDeleted = !user.isSoftDeleted;
        return res.status(200).json('success');
    }catch(err: any){
        return res.status(400).json(err.message);
    }
}

exports.delete_a_user = async(req: Request, res: Response) => {
    try{
        // here we need to delete the user in case of a sql database engine 
        // like sql we are gonna cascade all user's posts, comments and likes 
        // but as I'm using nosql (mongoose) we can delete the account
        await UserModel.deleteOne({ email: req.user.email });
        return res.status(200).json('Your account was deleted successfully');
    }catch(err: any){
        return res.status(400).json(err.message);
    }
}
