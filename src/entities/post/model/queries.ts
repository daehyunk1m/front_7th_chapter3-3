import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchPosts, addPost, updatePost, deletePost } from "../api"

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params: { limit: number; skip: number }) => [...postKeys.lists(), params] as const,
  search: (query: string) => [...postKeys.all, "search", query] as const,
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
    onSuccess: () => {
      // 캐시 무효화 → 목록 다시 조회
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}

// 게시물 수정
export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}

// 게시물 삭제
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}
