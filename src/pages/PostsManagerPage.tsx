import { useEffect } from "react"
import { Plus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card"
import { Button } from "@/shared/ui/Button"

import { PostTable } from "@/widget/PostTable"
import { UserInfoModal } from "@/features/user-info"
import { AddPostModal } from "@/features/add-post/ui/AddPostModal"
import { EditPostModal } from "@/features/edit-post"
import { limitAtom, PostFilter, skipAtom } from "@/features/post-filter"
import { AddCommentModal } from "@/features/comment-section/ui/AddCommentModal"
import { EditCommentModal } from "@/features/comment-section/ui/EditCommentModal"
import { PostDetailModal } from "@/widget/PostDetailModal"
import { PageNavigation } from "@/widget/PageNavigation"
import { showAddDialogAtom } from "@/entities/post/model/atoms"
import { useAtomValue, useSetAtom } from "jotai"
import { fetchTags } from "@/entities/tag/api"
import { loadingAtom } from "@/shared/model/atoms"
import { selectedTagAtom } from "@/entities/tag/model/atoms"
// import { fetchPosts } from "@/entities/post"

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
  const loading = useAtomValue(loadingAtom)

  const setShowAddDialog = useSetAtom(showAddDialogAtom)

  useEffect(() => {
    fetchTags()
  }, [])

  const selectedTag = useAtomValue(selectedTagAtom)
  const skip = useAtomValue(skipAtom)
  const limit = useAtomValue(limitAtom)
  useEffect(() => {
    if (selectedTag) {
      // fetchPostsByTag(selectedTag)
    } else {
      // fetchPosts(limit, skip)
      // await fetchPosts(limit, skip)
      //   setPosts(data.posts)
      //   setTotal(data.total)
      // } catch (error) {
      //   console.error("게시물 검색 오류:", error)
      // }
    }
    // updateURL()
  }, [skip, limit, selectedTag])

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
          <PostFilter />

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <PageNavigation />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostModal />

      {/* 게시물 수정 대화상자 */}
      <EditPostModal />

      {/* 댓글 추가 대화상자 */}
      <AddCommentModal />

      {/* 댓글 수정 대화상자 */}
      <EditCommentModal />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailModal />
      {/* 사용자 모달 */}
      <UserInfoModal />
    </Card>
  )
}

export default PostsManager
