import { Comments } from "@/features/comment-section/ui/Comments"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { HighlightText } from "@/shared/ui/HighlightText"
import type { PostWithAuthor } from "@/entities/post"
import type { Comment, NewComment } from "@/entities/comment"
import { Dispatch, SetStateAction } from "react"

export const PostDetailModal = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  comments,
  setNewComment,
  setShowAddCommentDialog,
  setSelectedComment,
  setShowEditCommentDialog,
  setComments,
}: {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => void
  selectedPost: PostWithAuthor | null
  searchQuery: string
  comments: Record<string, Comment[]>
  setNewComment: (newComment: NewComment) => void
  setShowAddCommentDialog: Dispatch<SetStateAction<boolean>>
  setSelectedComment: Dispatch<SetStateAction<Comment | null>>
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
  setComments: Dispatch<SetStateAction<Record<string, Comment[]>>>
}) => {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body} highlight={searchQuery} />
          </p>
          {selectedPost?.id && (
            <Comments
              postId={selectedPost.id}
              comments={comments}
              setNewComment={setNewComment}
              setShowAddCommentDialog={setShowAddCommentDialog}
              searchQuery={searchQuery}
              setSelectedComment={setSelectedComment}
              setShowEditCommentDialog={setShowEditCommentDialog}
              setComments={setComments}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
