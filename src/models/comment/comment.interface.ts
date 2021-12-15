// defining the interface which the comment's schema is gonna follow

export interface Comment {
    id: number;
    postId: number;
    commentAuthorId: number;
    content: string
}