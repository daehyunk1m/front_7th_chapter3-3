import { Comments } from "@/features/comment-section/ui/Comments"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { HighlightText } from "@/shared/ui/HighlightText"
import { selectedPostAtom } from "@/entities/post"
import { useAtomValue } from "jotai"
import { useAtom } from "jotai"
import { showPostDetailDialogAtom } from "@/entities/post/model/atoms"
import { searchQueryAtom } from "@/features/post-filter/model/atoms"

export const PostDetailModal = () => {
  const selectedPost = useAtomValue(selectedPostAtom)
  const searchQuery = useAtomValue(searchQueryAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)

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
          {selectedPost?.id && <Comments postId={selectedPost.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
