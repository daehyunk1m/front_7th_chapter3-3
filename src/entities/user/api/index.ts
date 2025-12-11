import { UsersData, User } from "../model/types"

export const fetchUsers = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  if (!response.ok) {
    throw new Error("사용자 리스트 가져오기 오류: " + response.statusText)
  }
  return (await response.json()) as UsersData
}

export const fetchUserById = async (userId: number) => {
  const response = await fetch(`/api/users/${userId}`)
  if (!response.ok) {
    throw new Error("사용자 가져오기 오류: " + response.statusText)
  }
  return (await response.json()) as User
}
