import type { Post, NewPost, PostsData } from "./model/types"
import { addPost, fetchPosts, deletePost, searchPosts } from "./api"

export type { Post, NewPost, PostsData }
export { addPost, fetchPosts, deletePost, searchPosts }
