import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/layout/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HR Performance Dashboard",
  description: "Track employee performance and manage HR operations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <ThemeProvider>
          <div className="min-h-screen relative">
            <Header />
            <main className="relative z-10">{children}</main>
            {/* Sky blue floating background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-sky-300/20 to-sky-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-white/30 to-sky-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-sky-400/20 to-sky-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
