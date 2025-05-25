"use client"

import { useMemo } from "react"
import { useAppStore } from "@/lib/store"
import type { User } from "@/types"

export function useSearch(users: User[]) {
  const { searchQuery, selectedDepartments, selectedRatings } = useAppStore()

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !searchQuery ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.department.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDepartment =
        selectedDepartments.length === 0 || selectedDepartments.includes(user.company.department)

      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(user.performance)

      return matchesSearch && matchesDepartment && matchesRating
    })
  }, [users, searchQuery, selectedDepartments, selectedRatings])

  return filteredUsers
}
