"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  onChange?: (rating: number) => void
}

export function StarRating({ rating, maxRating = 5, size = "md", readonly = true, onChange }: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
            !readonly && "cursor-pointer hover:text-yellow-400",
          )}
          onClick={() => !readonly && onChange?.(i + 1)}
        />
      ))}
    </div>
  )
}
