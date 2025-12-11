import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Textarea } from "@/shared/ui/Textarea"
import { updateComment, type Comment } from "@/entities/comment"
import { Dispatch, SetStateAction } from "react"

export const EditCommentModal = ({
  showEditCommentDialog,
  setShowEditCommentDialog,
  selectedComment,
  setSelectedComment,
  setComments,
}: {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: Dispatch<SetStateAction<boolean>>
  selectedComment: Comment | null
  setSelectedComment: Dispatch<SetStateAction<Comment | null>>
  setComments: Dispatch<SetStateAction<Record<string, Comment[]>>>
}) => {
  const handleUpdateComment = async (selectedComment: Comment) => {
    try {
      const data = await updateComment(selectedComment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }
  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...selectedComment!, body: e.target.value })}
          />
          <Button
            onClick={() => {
              if (selectedComment) {
                handleUpdateComment(selectedComment)
              }
            }}
          >
            댓글 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
