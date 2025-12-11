import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { searchQueryAtom } from "@/features/post-filter/model/atoms"
import { deleteComment, likeComment } from "@/entities/comment"
import {
  commentsAtom,
  newCommentAtom,
  selectedCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from "@/entities/comment/model/atoms"
import { HighlightText } from "@/shared/ui/HighlightText"
import { Button } from "@/shared/ui/Button"

// 댓글 렌더링
export const Comments = ({ postId }: { postId: number }) => {
  const searchQuery = useAtomValue(searchQueryAtom)
  const [comments, setComments] = useAtom(commentsAtom)
  const setNewComment = useSetAtom(newCommentAtom)
  const setShowAddCommentDialog = useSetAtom(showAddCommentDialogAtom)
  const setShowEditCommentDialog = useSetAtom(showEditCommentDialogAtom)
  const setSelectedComment = useSetAtom(selectedCommentAtom)

  const handleLikeComment = async (id: number, postId: number) => {
    if (!comments[postId]) throw new Error("댓글이 없습니다.")

    const addLikes = comments[postId].find((comment) => comment.id === id)!.likes + 1
    try {
      const data = await likeComment(id, addLikes)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === id ? data : comment)),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  const handleDeleteComment = async (id: number, postId: number) => {
    try {
      await deleteComment(id)
      setComments((prev) => ({ ...prev, [postId]: prev[postId].filter((comment) => comment.id !== id) }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
