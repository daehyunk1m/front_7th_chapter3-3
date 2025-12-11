import { Search } from "./Search"
import { ByTag } from "./ByTag"
import { BySort } from "./BySort"
import { ByOrder } from "./ByOrder"
import type { Tag } from "@/entities/tag"

export const PostFilter = ({
  searchQuery,
  setSearchQuery,
  searchPosts,
  selectedTag,
  setSelectedTag,
  fetchPostsByTag,
  updateURL,
  tags,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  searchPosts: () => void
  selectedTag: string
  setSelectedTag: (selectedTag: string) => void
  fetchPostsByTag: (selectedTag: string) => void
  updateURL: () => void
  tags: Tag[]
  sortBy: string
  setSortBy: (sortBy: string) => void
  sortOrder: string
  setSortOrder: (sortOrder: string) => void
}) => {
  return (
    <div className="flex gap-4">
      <PostFilter.Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPosts={searchPosts} />
      <PostFilter.ByTag
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        fetchPostsByTag={fetchPostsByTag}
        updateURL={updateURL}
        tags={tags}
      />
      <PostFilter.BySort sortBy={sortBy} setSortBy={setSortBy} />
      <PostFilter.ByOrder sortOrder={sortOrder} setSortOrder={setSortOrder} />
    </div>
  )
}

PostFilter.Search = Search
PostFilter.ByOrder = ByOrder
PostFilter.BySort = BySort
PostFilter.ByTag = ByTag
