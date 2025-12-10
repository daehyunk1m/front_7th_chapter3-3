import { Comment, NewComment, CommentsData } from "./model/types"
import { deleteComment, addComment, fetchComments, updateComment, likeComment } from "./api"

export type { Comment, NewComment, CommentsData }
export { fetchComments, addComment, updateComment, deleteComment, likeComment }
