"use client"

import { useUsers } from "@/hooks/useUsers"
import { useSearch } from "@/hooks/useSearch"
import { SearchFilters } from "@/components/ui/search-filters"
import { UserCard } from "@/components/ui/user-card"
import { LoadingSkeleton } from "@/components/layout/loading-skeleton"

export default function HomePage() {
  const users = useUsers()
  const filteredUsers = useSearch(users)

  if (users.length === 0) {
    return (
      <div className="sky-theme min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-sky-800 to-sky-600 bg-clip-text text-transparent">
                Employee Dashboard
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                Manage and track employee performance across your organization with advanced analytics and insights.
              </p>
            </div>
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sky-theme min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-sky-800 to-sky-600 bg-clip-text text-transparent">
              Employee Dashboard
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Manage and track employee performance across your organization with advanced analytics and insights.
            </p>
          </div>

          <div className="sky-card p-4 sm:p-6">
            <SearchFilters />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sky-card p-4">
            <p className="text-sm sm:text-base text-white/80">
              Showing <span className="font-semibold text-white">{filteredUsers.length}</span> of{" "}
              <span className="font-semibold text-white">{users.length}</span> employees
            </p>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Live Data
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="sky-card p-8 sm:p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-sky-400/30 to-sky-600/30 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">No employees found</h3>
                <p className="text-white/70">Try adjusting your search criteria or filters to find employees.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
