"use client"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { generateMockData } from "@/lib/utils"

export function useUsers() {
  const { users, setUsers } = useAppStore()

  useEffect(() => {
    if (users.length === 0) {
      fetch("https://dummyjson.com/users?limit=20")
        .then((res) => res.json())
        .then((data) => {
          const enhancedUsers = data.users.map(generateMockData)
          setUsers(enhancedUsers)
        })
        .catch(console.error)
    }
  }, [users.length, setUsers])

  return users
}
