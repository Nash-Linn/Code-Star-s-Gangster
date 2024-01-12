import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

export const isAdmin = ():boolean => {
  const roles = userStore.getRoles
  return roles.includes('admin')
}