import { fetchUserById } from "@/entities/user"

import type { User } from "@/entities/user"

export const UserProfile = ({
  user,
  setSelectedUser,
  setShowUserModal,
}: {
  user: User | null
  setSelectedUser: (user: User) => void
  setShowUserModal: (showUserModal: boolean) => void
}) => {
  const handleOpenUserInfo = async (id: number) => {
    try {
      const userData = await fetchUserById(id)
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => user && handleOpenUserInfo(user.id)}>
      <img src={user?.image} alt={user?.username} className="w-8 h-8 rounded-full" />
      <span>{user?.username || ""}</span>
    </div>
  )
}
