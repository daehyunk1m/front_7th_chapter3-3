import { useEffect, useState } from "react"
import { Plus, Search } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card"
import { Textarea } from "@/shared/ui/Textarea"
import { Input } from "@/shared/ui/Input"
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
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value)
                fetchPostsByTag(value)
                updateURL()
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable posts={posts} />}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
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
            <Button onClick={addComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
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
                  updateComment(selectedComment)
                }
              }}
            >
              댓글 업데이트
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
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

      {/* 사용자 모달 */}
      <UserInfoModal user={selectedUser} showUserInfo={showUserInfo} setShowUserInfo={setShowUserInfo} />
    </Card>
  )
}

export default PostsManager
