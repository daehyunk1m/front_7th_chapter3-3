import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchComments, addComment, updateComment, deleteComment, likeComment } from "../api"

export const commentKeys = {
  all: ["comments"] as const,
  list: (postId: number) => [...commentKeys.all, "list", postId] as const,
}

// 댓글 목록 조회
export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => fetchComments(postId),
    enabled: postId > 0,
  })
}

// 댓글 추가
export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(data.postId) })
    },
  })
}

// 댓글 수정
export const useUpdateCommentMutation = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
    },
  })
}

// 댓글 삭제
export const useDeleteCommentMutation = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
    },
  })
}

// 댓글 좋아요
export const useLikeCommentMutation = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => likeComment(id, likes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
    },
  })
}
