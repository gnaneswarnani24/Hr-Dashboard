"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/lib/store"
import { Search, Filter, X } from "lucide-react"

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"]
const ratings = [1, 2, 3, 4, 5]

export function SearchFilters() {
  const {
    searchQuery,
    selectedDepartments,
    selectedRatings,
    setSearchQuery,
    setSelectedDepartments,
    setSelectedRatings,
  } = useAppStore()

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, department])
    } else {
      setSelectedDepartments(selectedDepartments.filter((d) => d !== department))
    }
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating])
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating))
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedDepartments([])
    setSelectedRatings([])
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-600/70 dark:text-sky-300/70 w-4 h-4" />
          <Input
            placeholder="Search by name, email, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 backdrop-blur-sm bg-white/30 dark:bg-sky-800/30 border-sky-300/40 text-sky-800 dark:text-sky-100 placeholder:text-sky-600/70 dark:placeholder:text-sky-300/70 focus:bg-white/40 dark:focus:bg-sky-800/40 focus:border-sky-400/60 transition-all duration-300"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="backdrop-blur-sm bg-white/30 dark:bg-sky-800/30 border-sky-300/40 text-sky-800 dark:text-sky-100 hover:bg-white/40 dark:hover:bg-sky-800/40 hover:border-sky-400/60 transition-all duration-300 justify-between sm:justify-center"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Department</span>
                  <span className="sm:hidden">Dept</span>
                  {selectedDepartments.length > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-sky-500/30 text-white border-sky-400/50">
                      {selectedDepartments.length}
                    </Badge>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="backdrop-blur-lg bg-white/95 dark:bg-sky-900/95 border-sky-300/40">
              {departments.map((department) => (
                <DropdownMenuCheckboxItem
                  key={department}
                  checked={selectedDepartments.includes(department)}
                  onCheckedChange={(checked) => handleDepartmentChange(department, checked)}
                  className="hover:bg-white/20 dark:hover:bg-white/10"
                >
                  {department}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="backdrop-blur-sm bg-white/30 dark:bg-sky-800/30 border-sky-300/40 text-sky-800 dark:text-sky-100 hover:bg-white/40 dark:hover:bg-sky-800/40 hover:border-sky-400/60 transition-all duration-300 justify-between sm:justify-center"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Rating</span>
                  <span className="sm:hidden">Rate</span>
                  {selectedRatings.length > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-sky-500/30 text-white border-sky-400/50">
                      {selectedRatings.length}
                    </Badge>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="backdrop-blur-lg bg-white/95 dark:bg-sky-900/95 border-sky-300/40">
              {ratings.map((rating) => (
                <DropdownMenuCheckboxItem
                  key={rating}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={(checked) => handleRatingChange(rating, checked)}
                  className="hover:bg-white/20 dark:hover:bg-white/10"
                >
                  {rating} Star{rating !== 1 ? "s" : ""}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {(searchQuery || selectedDepartments.length > 0 || selectedRatings.length > 0) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="backdrop-blur-sm bg-sky-500/20 border-sky-400/40 text-sky-800 dark:text-sky-100 hover:bg-sky-500/30 hover:border-sky-400/60 transition-all duration-300"
            >
              <X className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}
        </div>
      </div>

      {(selectedDepartments.length > 0 || selectedRatings.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedDepartments.map((dept) => (
            <Badge
              key={dept}
              variant="secondary"
              className="cursor-pointer backdrop-blur-sm bg-sky-500/30 text-white border-sky-400/50 hover:bg-sky-500/40 transition-all duration-300"
              onClick={() => handleDepartmentChange(dept, false)}
            >
              {dept} <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {selectedRatings.map((rating) => (
            <Badge
              key={rating}
              variant="secondary"
              className="cursor-pointer backdrop-blur-sm bg-sky-500/30 text-white border-sky-400/50 hover:bg-sky-500/40 transition-all duration-300"
              onClick={() => handleRatingChange(rating, false)}
            >
              {rating} Star{rating !== 1 ? "s" : ""} <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
