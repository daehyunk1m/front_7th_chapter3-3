import { addPost, Post, type NewPost } from "@/entities/post"
import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Input } from "@/shared/ui/Input"
import { Textarea } from "@/shared/ui/Textarea"

export const AddPostModal = ({
  showAddDialog,
  setShowAddDialog,
  newPost,
  setNewPost,
  setPosts,
  posts,
}: {
  showAddDialog: boolean
  setShowAddDialog: (showAddDialog: boolean) => void
  newPost: NewPost
  setNewPost: (newPost: NewPost) => void
  setPosts: (posts: Post[]) => void
  posts: Post[]
}) => {
  const handleAddPost = async (newPost: NewPost) => {
    try {
      const data = await addPost(newPost)
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }
  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={() => handleAddPost(newPost)}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
