import { CommentsData, Comment, NewComment } from "../model/types"

// 댓글 가져오기
export const fetchComments = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  if (!response.ok) {
    throw new Error("댓글 가져오기 오류: " + response.statusText)
  }
  return (await response.json()) as CommentsData
}

// export const handleFetchComments = async (postId: number) => {
//   try {
//     const data = await fetchComments(postId)
//     setComments((prev) => ({ ...prev, [postId]: data.comments }))
//   } catch (error) {
//     console.error("댓글 가져오기 오류:", error)
//   }
// }

// 댓글 추가
export const addComment = async (newComment: NewComment) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  if (!response.ok) {
    throw new Error("댓글 추가 오류: " + response.statusText)
  }
  const data = (await response.json()) as Comment
  return data
}

// 댓글 업데이트
export const updateComment = async (selectedComment: Comment) => {
  const response = await fetch(`/api/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment.body }),
  })
  if (!response.ok) {
    throw new Error("댓글 업데이트 오류: " + response.statusText)
  }
  const data = (await response.json()) as Comment
  return data
}

// 댓글 삭제
export const deleteComment = async (id: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("댓글 삭제 오류: " + response.statusText)
  }
  return await response.json() // 정확한 반환값 아직 모름.
}

// 댓글 좋아요
export const likeComment = async (id: number, addLikes: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      likes: addLikes,
    }),
  })
  if (!response.ok) {
    throw new Error("댓글 좋아요 오류: " + response.statusText)
  }
  const data = (await response.json()) as Comment
  return data
}
