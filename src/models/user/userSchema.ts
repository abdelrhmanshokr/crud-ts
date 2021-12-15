import mongoose from 'mongoose';

import { User } from './user.interface';

const userSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v: string){
                let regularExpression = /[a-z]+/i;
                return v.match(regularExpression);
            },
            message: 'Invalid username please try another one!'
        }
    }, 
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function(v: string){
                let regularExpression = '^\S+@\S+$';
                return v.match(regularExpression);
            },
            message: 'Invalid email please try again'
        }
    },
    isSoftDeleted: {
        type: Boolean,
        default: 0
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model<User>('User', userSchema);
export { UserModel };