import { Tag } from "../model/types"

// 태그 가져오기
export const fetchTags = async () => {
  const response = await fetch("/api/posts/tags")
  if (!response.ok) {
    throw new Error("태그 가져오기 오류: " + response.statusText)
  }
  return (await response.json()) as Tag[]
}

// export const handleFetchTags = async () => {
//   try {
//     const data = await fetchTags()
//     setTags(data)
//   } catch (error) {
//     console.error("태그 가져오기 오류:", error)
//   }
// }
