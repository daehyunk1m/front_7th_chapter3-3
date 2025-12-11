import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"
import type { Tag } from "@/entities/tag"

export const ByTag = ({
  selectedTag,
  setSelectedTag,
  fetchPostsByTag,
  updateURL,
  tags,
}: {
  selectedTag: string
  setSelectedTag: (selectedTag: string) => void
  fetchPostsByTag: (selectedTag: string) => void
  updateURL: () => void
  tags: Tag[]
}) => {
  return (
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
  )
}
