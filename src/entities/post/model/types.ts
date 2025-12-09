export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  views: number
  reactions: {
    likes: number
    dislikes: number
  }
}
