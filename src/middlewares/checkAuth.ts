import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user/userSchema';
import {Request, Response, NextFunction } from 'express';

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers['authorization'].replace('Bearer ', '');
        const decodedToken: Object = jwt.verify(token, 'secreKey123');
        const user = await UserModel.findOne({ _id: decodedToken._id });

        if(!token) throw new Error('login token missing');
        if(!user) throw new Error('Unauthorized access');

        req.user = user;
        next();
    }catch(err){
        return res.status(401).json('Unauthorized access');
    }
}