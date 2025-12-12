import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchPosts, addPost, updatePost, deletePost, searchPosts, fetchPostsByTag } from "../api"

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params: { limit: number; skip: number }) => [...postKeys.lists(), params] as const,
  search: (query: string) => [...postKeys.all, "search", query] as const,
  byTag: (tag: string) => [...postKeys.all, "tag", tag] as const,
}

// 게시물 목록 조회
export const usePostsQuery = (limit: number, skip: number) => {
  return useQuery({
    queryKey: postKeys.list({ limit, skip }),
    queryFn: () => fetchPosts(limit, skip),
  })
}

// 게시물 추가
export const useAddPostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addPost,
    onSuccess: (newPost) => {
      // 모든 posts list 캐시에 새 게시물을 맨 앞에 추가
      queryClient.setQueriesData(
        { queryKey: postKeys.lists() },
        (oldData: { posts: unknown[]; total: number } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            posts: [newPost, ...oldData.posts],
            total: oldData.total + 1,
          }
        },
      )
    },
  })
}

// 게시물 수정
export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      // 모든 posts list 캐시에서 해당 게시물 업데이트
      queryClient.setQueriesData(
        { queryKey: postKeys.lists() },
        (oldData: { posts: { id: number }[] } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            posts: oldData.posts.map((post) =>
              post.id === updatedPost.id ? { ...post, ...updatedPost } : post,
            ),
          }
        },
      )
    },
  })
}

// 게시물 삭제
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, deletedId) => {
      // 모든 posts list 캐시에서 해당 게시물 제거
      queryClient.setQueriesData(
        { queryKey: postKeys.lists() },
        (oldData: { posts: { id: number }[]; total: number } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            posts: oldData.posts.filter((post) => post.id !== deletedId),
            total: oldData.total - 1,
          }
        },
      )
    },
  })
}

// 게시물 검색
export const useSearchPostsQuery = (query: string) => {
  return useQuery({
    queryKey: postKeys.search(query),
    queryFn: () => searchPosts(query),
    enabled: query.length > 0,
  })
}

// 태그별 게시물 조회
export const usePostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: postKeys.byTag(tag),
    queryFn: () => fetchPostsByTag(tag),
    enabled: tag.length > 0 && tag !== "all",
  })
}
