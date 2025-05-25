"use client"

import { useUsers } from "@/hooks/useUsers"
import { useBookmarks } from "@/hooks/useBookmarks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { useAppStore } from "@/lib/store"
import { Trash2, TrendingUp, FolderPlus, Eye, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function BookmarksPage() {
  const users = useUsers()
  const bookmarkedUsers = useBookmarks(users)
  const { toggleBookmark, promoteUser, assignToProject } = useAppStore()
  const [assigningProject, setAssigningProject] = useState<number | null>(null)

  const handleAssignProject = (userId: number) => {
    const projectName = prompt("Enter project name:")
    if (projectName) {
      assignToProject(userId, projectName)
      setAssigningProject(null)
    }
  }

  if (bookmarkedUsers.length === 0) {
    return (
      <div className="sky-theme min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-sky-800 to-sky-600 bg-clip-text text-transparent">
                Bookmarked Employees
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                Manage your favorite employees and perform quick actions on your saved team members.
              </p>
            </div>

            <div className="sky-card p-8 sm:p-12 text-center max-w-md mx-auto">
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-sky-400/30 to-sky-600/30 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-white/60" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">No bookmarked employees yet</h3>
                  <p className="text-white/70">Start bookmarking employees to see them here for quick access.</p>
                </div>
                <Button asChild className="sky-button">
                  <Link href="/">Browse Employees</Link>
                </Button>
              </div>
            </div>
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
              Bookmarked Employees
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Manage your favorite employees and perform quick actions on your saved team members.
            </p>
          </div>

          <div className="sky-card p-4 text-center">
            <p className="text-white/80">
              <span className="font-semibold text-white">{bookmarkedUsers.length}</span> bookmarked employee
              {bookmarkedUsers.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {bookmarkedUsers.map((user) => (
              <Card key={user.id} className="sky-card floating-element group overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={user.image || "/placeholder.svg"}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-sky-300/40 group-hover:ring-sky-500/60 transition-all duration-300"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Heart className="w-2 h-2 text-white fill-current" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg text-white truncate">
                        {user.firstName} {user.lastName}
                      </CardTitle>
                      <p className="text-sm text-white/70 truncate">{user.email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="backdrop-blur-sm bg-white/30 dark:bg-white/20 text-gray-800 dark:text-white border-white/40"
                    >
                      {user.company.department}
                    </Badge>
                    <StarRating rating={user.performance} />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="sky-button-outline hover:scale-105 transition-all duration-300"
                    >
                      <Link href={`/employee/${user.id}`}>
                        <Eye className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">View</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleBookmark(user.id)}
                      className="sky-button-outline hover:scale-105 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Remove</span>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => promoteUser(user.id)}
                      className="sky-button hover:scale-105 transition-all duration-300"
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Promote</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAssignProject(user.id)}
                      className="sky-button-outline hover:scale-105 transition-all duration-300"
                    >
                      <FolderPlus className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Assign</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
