"use client"

import { useMemo } from "react"
import { useAppStore } from "@/lib/store"
import type { User } from "@/types"

export function useBookmarks(users: User[]) {
  const { bookmarkedUsers } = useAppStore()

  const bookmarkedUsersList = useMemo(() => {
    return users.filter((user) => bookmarkedUsers.includes(user.id))
  }, [users, bookmarkedUsers])

  return bookmarkedUsersList
}
