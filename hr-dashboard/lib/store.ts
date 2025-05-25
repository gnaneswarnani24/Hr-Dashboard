import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/types"

interface AppState {
  users: User[]
  bookmarkedUsers: number[]
  searchQuery: string
  selectedDepartments: string[]
  selectedRatings: number[]
  isDarkMode: boolean
  setUsers: (users: User[]) => void
  toggleBookmark: (userId: number) => void
  setSearchQuery: (query: string) => void
  setSelectedDepartments: (departments: string[]) => void
  setSelectedRatings: (ratings: number[]) => void
  toggleDarkMode: () => void
  promoteUser: (userId: number) => void
  assignToProject: (userId: number, projectName: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: [],
      bookmarkedUsers: [],
      searchQuery: "",
      selectedDepartments: [],
      selectedRatings: [],
      isDarkMode: false,
      setUsers: (users) => set({ users }),
      toggleBookmark: (userId) =>
        set((state) => {
          const isBookmarked = state.bookmarkedUsers.includes(userId)
          const updatedBookmarks = isBookmarked
            ? state.bookmarkedUsers.filter((id) => id !== userId)
            : [...state.bookmarkedUsers, userId]

          const updatedUsers = state.users.map((user) =>
            user.id === userId ? { ...user, isBookmarked: !isBookmarked } : user,
          )

          return {
            bookmarkedUsers: updatedBookmarks,
            users: updatedUsers,
          }
        }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedDepartments: (departments) => set({ selectedDepartments: departments }),
      setSelectedRatings: (ratings) => set({ selectedRatings: ratings }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      promoteUser: (userId) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? { ...user, company: { ...user.company, title: `Senior ${user.company.title}` } }
              : user,
          ),
        })),
      assignToProject: (userId, projectName) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  projects: [
                    ...user.projects,
                    {
                      id: `proj-${userId}-${Date.now()}`,
                      name: projectName,
                      status: "active" as const,
                      progress: 0,
                      startDate: new Date().toISOString().split("T")[0],
                    },
                  ],
                }
              : user,
          ),
        })),
    }),
    {
      name: "hr-dashboard-storage",
      partialize: (state) => ({
        bookmarkedUsers: state.bookmarkedUsers,
        isDarkMode: state.isDarkMode,
      }),
    },
  ),
)
