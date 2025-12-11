import { Search } from "./Search"
import { ByTag } from "./ByTag"
import { BySort } from "./BySort"
import { ByOrder } from "./ByOrder"

// 얘는 위젯 아녀?
export const PostFilter = () => {
  return (
    <div className="flex gap-4">
      <PostFilter.Search />
      <PostFilter.ByTag />
      <PostFilter.BySort />
      <PostFilter.ByOrder />
    </div>
  )
}

PostFilter.Search = Search
PostFilter.ByTag = ByTag
PostFilter.BySort = BySort
PostFilter.ByOrder = ByOrder
