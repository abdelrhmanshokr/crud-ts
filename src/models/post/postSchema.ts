import mongoose from 'mongoose';

import { Post } from './post.interface';

const postSchema = new mongoose.Schema<Post>({
    content: {
        type: String,
        trim: true,
        required: true
    },
    authorId: {
        // TODO - this should ref to the user collection
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const PostModel = mongoose.model<Post>('Post', postSchema);
export{ PostModel };