"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "./star-rating"
import type { User } from "@/types"
import { useAppStore } from "@/lib/store"
import { Bookmark, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const { toggleBookmark, promoteUser } = useAppStore()

  const handlePromote = () => {
    promoteUser(user.id)
  }

  return (
    <Card className="sky-card floating-element group overflow-hidden">
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-300/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{user.email}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleBookmark(user.id)}
            className={cn(
              "backdrop-blur-sm transition-all duration-300 hover:scale-110",
              user.isBookmarked
                ? "text-sky-600 bg-sky-500/20 hover:bg-sky-500/30"
                : "text-gray-500 hover:text-sky-600 hover:bg-sky-500/20",
            )}
          >
            <Bookmark className={`w-4 h-4 ${user.isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Age: {user.age}</p>
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-white/40 dark:bg-sky-800/40 text-sky-800 dark:text-sky-100 border-sky-300/50"
            >
              {user.company.department}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Performance</p>
            <StarRating rating={user.performance} />
          </div>
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
            variant="default"
            size="sm"
            className="sky-button hover:scale-105 transition-all duration-300"
            onClick={handlePromote}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Promote</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
