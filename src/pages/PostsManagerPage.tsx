import { useEffect, useState } from "react"
import { Plus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card"
import { Textarea } from "@/shared/ui/Textarea"
import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"
import { HighlightText } from "@/shared/ui/HighlightText"

import type { NewPost, PostWithAuthor } from "@/entities/post"
import type { User } from "@/entities/user"
import type { Comment, NewComment } from "@/entities/comment"
import type { Tag } from "@/entities/tag"
import { PostTable } from "@/widget/PostTable"
import { UserInfoModal } from "@/features/user-info"
import { Comments } from "@/features/comment-section/ui/Comments"
import { AddPostModal } from "@/features/add-post/ui/AddPostModal"
import { EditPostModal } from "@/features/edit-post"
import { PostFilter } from "@/features/post-filter/ui/PostFilter"
import { AddCommentModal } from "@/features/comment-section/ui/AddCommentModal"
import { EditCommentModal } from "@/features/comment-section/ui/EditCommentModal"
import { PostDetailModal } from "@/widget/PostDetailModal"
import { PageNavigation } from "@/widget/PageNavigation"

const PostsManager = () => {
  // const {
  //   skip,
  //   limit,
  //   searchQuery,
  //   sortBy,
  //   sortOrder,
  //   selectedTag,
  //   setSkip,
  //   setLimit,
  //   setSearchQuery,
  //   setSortBy,
  //   setSortOrder,
  //   setSelectedTag,
  //   updateURL,
  // } = useRouting()
  // 상태 관리
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [total, setTotal] = useState(0)
  const [selectedPost, setSelectedPost] = useState<PostWithAuthor | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [comments, setComments] = useState<Record<string, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // 게시물 상세 보기
  const openPostDetail = (post: PostWithAuthor) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  useEffect(() => {
    fetchTags()
  }, [])

  // useEffect(() => {
  //   if (selectedTag) {
  //     fetchPostsByTag(selectedTag)
  //   } else {
  //     fetchPosts()
  //   }
  //   updateURL()
  // }, [skip, limit, sortBy, sortOrder, selectedTag])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchPosts={searchPosts}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            fetchPostsByTag={fetchPostsByTag}
            updateURL={updateURL}
            tags={tags}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable posts={posts} />}

          {/* 페이지네이션 */}
          <PageNavigation limit={limit} skip={skip} setLimit={setLimit} setSkip={setSkip} total={total} />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostModal
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        setPosts={setPosts}
        posts={posts}
      />

      {/* 게시물 수정 대화상자 */}
      <EditPostModal
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        setPosts={setPosts}
      />

      {/* 댓글 추가 대화상자 */}
      <AddCommentModal
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        setComments={setComments}
      />

      {/* 댓글 수정 대화상자 */}
      <EditCommentModal
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        setComments={setComments}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailModal
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        searchQuery={searchQuery}
      />
      {/* 사용자 모달 */}
      <UserInfoModal user={selectedUser} showUserInfo={showUserInfo} setShowUserInfo={setShowUserInfo} />
    </Card>
  )
}

export default PostsManager
