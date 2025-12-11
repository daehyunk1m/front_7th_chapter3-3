import type { Post, NewPost, PostsData } from "./model/types"
import type { PostWithAuthor } from "./@x/with-user"

import { addPost, fetchPosts, deletePost, searchPosts, updatePost } from "./api"

export type { Post, NewPost, PostsData, PostWithAuthor }
export { addPost, fetchPosts, deletePost, searchPosts, updatePost }
