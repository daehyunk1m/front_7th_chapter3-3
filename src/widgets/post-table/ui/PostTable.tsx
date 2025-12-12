import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { MessageSquare, ThumbsUp, ThumbsDown, Edit2, Trash2 } from "lucide-react"
import { UserProfile } from "@/features/user-info/ui/UserProfile"
import { searchQueryAtom, skipAtom, limitAtom } from "@/features/post-filter"
import { PostWithAuthor, selectedPostAtom, showEditDialogAtom, usePostsQuery, useDeletePostMutation } from "@/entities/post"
import { selectedTagAtom } from "@/entities/tag/model/atoms"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/Table"
import { HighlightText } from "@/shared/ui/HighlightText"
import { Button } from "@/shared/ui/Button"
import { fetchComments } from "@/entities/comment/api"

// 게시물 테이블 렌더링
export const PostTable = () => {
  const skip = useAtomValue(skipAtom)
  const limit = useAtomValue(limitAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  const { data } = usePostsQuery(limit, skip)
  const posts = (data?.posts ?? []) as PostWithAuthor[]

  const searchQuery = useAtomValue(searchQueryAtom)
  const setSelectedPost = useSetAtom(selectedPostAtom)
  const setShowEditDialog = useSetAtom(showEditDialogAtom)

  const { mutate: deletePostMutate } = useDeletePostMutation()

  // 게시물 상세 보기
  const openPostDetail = (post: PostWithAuthor) => {
    setSelectedPost(post)
    fetchComments(post.id)
  }

  const handleDeletePost = (id: number) => {
    deletePostMutate(id, {
      onError: (error) => {
        console.error("게시물 삭제 오류:", error)
      },
    })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>
                  <HighlightText text={post.title} highlight={searchQuery} />
                </div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        // updateURL()
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>{post.author && <UserProfile />}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
