"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { Moon, Sun, Users, Bookmark, BarChart3, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const { isDarkMode, toggleDarkMode } = useAppStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/", icon: Users },
    { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/20 dark:bg-sky-900/20 border-b border-sky-300/30 dark:border-sky-400/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link
              href="/"
              className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent"
            >
              HR Dashboard
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-sky-600 dark:hover:text-sky-400 px-3 py-2 rounded-lg hover:bg-white/30 dark:hover:bg-sky-800/30",
                      pathname === item.href
                        ? "text-sky-600 dark:text-sky-400 bg-white/30 dark:bg-sky-800/30"
                        : "text-gray-700 dark:text-gray-300",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="backdrop-blur-sm bg-white/30 dark:bg-sky-800/30 hover:bg-white/40 dark:hover:bg-sky-800/40 border border-sky-300/40 dark:border-sky-400/30"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden backdrop-blur-sm bg-white/30 dark:bg-sky-800/30 hover:bg-white/40 dark:hover:bg-sky-800/40 border border-sky-300/40 dark:border-sky-400/30"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 backdrop-blur-lg bg-white/30 dark:bg-sky-800/30 rounded-lg mt-2 border border-sky-300/40 dark:border-sky-400/30">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 text-sm font-medium transition-all duration-300 px-4 py-3 rounded-lg mx-2",
                      pathname === item.href
                        ? "text-blue-600 dark:text-blue-400 bg-white/30 dark:bg-white/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
