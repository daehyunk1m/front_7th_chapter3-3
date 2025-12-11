import { useAtom, useSetAtom } from "jotai"
import { SearchIcon } from "lucide-react"
import { searchQueryAtom } from "../model/atoms"
import { searchPosts } from "@/entities/post/api"
import { postsAtom, totalAtom } from "@/entities/post/model/atoms"
import { Input } from "@/shared/ui/Input"

export const Search = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const setPosts = useSetAtom(postsAtom)
  const setTotal = useSetAtom(totalAtom)

  const handleSearchPosts = async (searchQuery: string) => {
    if (!searchQuery) {
      //  handleFetchPosts()
      return
    }
    // setLoading(true)

    try {
      const data = await searchPosts(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    // setLoading(false)
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchPosts(searchQuery)}
        />
      </div>
    </div>
  )
}
