import { useAtom, useAtomValue } from "jotai"
import { selectedTagAtom, tagsAtom } from "@/entities/tag/model/atoms"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"

export const ByTag = () => {
  const tags = useAtomValue(tagsAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        // fetchPostsByTag(value)
        // updateURL()
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
