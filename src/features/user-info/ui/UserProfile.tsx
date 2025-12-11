import { fetchUserById } from "@/entities/user"
import { selectedUserAtom, showUserInfoAtom } from "@/entities/user/model/atoms"

import { useAtom, useSetAtom } from "jotai"

export const UserProfile = () => {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)
  const setShowUserInfo = useSetAtom(showUserInfoAtom)

  const handleOpenUserInfo = async (id: number) => {
    try {
      const userData = await fetchUserById(id)
      setSelectedUser(userData)
      setShowUserInfo(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => selectedUser && handleOpenUserInfo(selectedUser.id)}
    >
      <img src={selectedUser?.image} alt={selectedUser?.username} className="w-8 h-8 rounded-full" />
      <span>{selectedUser?.username || ""}</span>
    </div>
  )
}
