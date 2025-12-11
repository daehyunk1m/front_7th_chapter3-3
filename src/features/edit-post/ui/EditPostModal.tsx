import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Input } from "@/shared/ui/Input"
import { Textarea } from "@/shared/ui/Textarea"
import { Button } from "@/shared/ui/Button"
import { postsAtom, selectedPostAtom, showEditDialogAtom, updatePost, type PostWithAuthor } from "@/entities/post"
import { useAtom, useSetAtom } from "jotai"

export const EditPostModal = () => {
  const setPosts = useSetAtom(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)

  const handleUpdatePost = async (selectedPost: PostWithAuthor) => {
    try {
      const data = await updatePost(selectedPost) // 여기서 data는 PostWithAuthor 타입인지 Post인지 확인해봐야함.
      setPosts((prevPosts: PostWithAuthor[]) => prevPosts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost!, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost!, body: e.target.value })}
          />
          <Button
            onClick={() => {
              if (selectedPost) {
                handleUpdatePost(selectedPost)
              }
            }}
          >
            게시물 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
