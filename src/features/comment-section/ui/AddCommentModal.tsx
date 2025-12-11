import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Textarea } from "@/shared/ui/Textarea"
import { addComment, type Comment, type NewComment } from "@/entities/comment"
import { Dispatch, SetStateAction } from "react"

export const AddCommentModal = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  newComment,
  setNewComment,
  setComments,
}: {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: Dispatch<SetStateAction<boolean>>
  newComment: NewComment
  setNewComment: Dispatch<SetStateAction<NewComment>>
  setComments: Dispatch<SetStateAction<Record<string, Comment[]>>>
}) => {
  const handleAddComment = async (newComment: NewComment) => {
    try {
      const data = await addComment(newComment)
      setComments((prev) => ({ ...prev, [data.postId]: [...(prev[data.postId] || []), data] }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={() => handleAddComment(newComment)}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
