import { Request, Response, NextFunction } from 'express';

import { UserModel } from '../models/user/userSchema';

export const checkSoftDeleted = async(req: Request, res: Response, next: NextFunction) => {
    try{
        let user = await UserModel.findOne({_id: req.user._id });
        if(user.isSoftDeleted) throw new Error(
            'Your account is temporarily suspended'
        );

        next()
    }catch(err: any){
        return res.status(401).json('Unauthorized access');
    }
}