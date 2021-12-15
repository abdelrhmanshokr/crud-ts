import mongoose from 'mongoose';

import { Comment } from './comment.interface';

const commentSchema = new mongoose.Schema<Comment>({
    postId: {
        // TODO - this should ref to the post collection
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    commentAuthorId: {
        // TODO - this should ref to the user collection
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const CommentModel = mongoose.model<Comment>('Comment', commentSchema);
export { CommentModel };