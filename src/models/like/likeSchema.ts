import mongoose from 'mongoose';

import { Like } from './like.interface.schema';

const likeSchema = new mongoose.Schema<Like>({
    postId: {
        // TODO - this should ref to the posts collection
        type: Number,
        required: true
    },
    likeAuthorId: {
        // TODO - this should ref to the users collection
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const LikeModel = mongoose.model<Like>('Like', likeSchema);
export { LikeModel };