"use client"

import { useUsers } from "@/hooks/useUsers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { DepartmentStats } from "@/types"
import { useMemo } from "react"
import { TrendingUp, Users, Star, Bookmark } from "lucide-react"

const COLORS = ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd", "#e0f2fe", "#f0f9ff"]

export default function AnalyticsPage() {
  const users = useUsers()

  const departmentStats: DepartmentStats[] = useMemo(() => {
    const deptMap = new Map<string, { totalRating: number; count: number }>()

    users.forEach((user) => {
      const dept = user.company.department
      const current = deptMap.get(dept) || { totalRating: 0, count: 0 }
      deptMap.set(dept, {
        totalRating: current.totalRating + user.performance,
        count: current.count + 1,
      })
    })

    return Array.from(deptMap.entries()).map(([department, stats]) => ({
      department,
      averageRating: Number((stats.totalRating / stats.count).toFixed(2)),
      employeeCount: stats.count,
    }))
  }, [users])

  const bookmarkTrends = useMemo(() => {
    const bookmarkedCount = users.filter((user) => user.isBookmarked).length
    return [
      { name: "Bookmarked", value: bookmarkedCount },
      { name: "Not Bookmarked", value: users.length - bookmarkedCount },
    ]
  }, [users])

  const performanceDistribution = useMemo(() => {
    const distribution = [1, 2, 3, 4, 5].map((rating) => ({
      rating: `${rating} Star${rating !== 1 ? "s" : ""}`,
      count: users.filter((user) => user.performance === rating).length,
    }))
    return distribution
  }, [users])

  const avgRating = users.length > 0 ? users.reduce((sum, user) => sum + user.performance, 0) / users.length : 0
  const bookmarkedCount = users.filter((user) => user.isBookmarked).length

  if (users.length === 0) {
    return (
      <div className="sky-theme min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-sky-800 to-sky-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                Comprehensive insights and trends across your organization with real-time data visualization.
              </p>
            </div>
            <div className="sky-card p-8 text-center">
              <p className="text-white/70">Loading analytics data...</p>
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
              Analytics Dashboard
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Comprehensive insights and trends across your organization with real-time data visualization.
            </p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="sky-card floating-element">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-sky-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white">{users.length}</div>
                <p className="text-xs text-white/60 mt-1">Active workforce</p>
              </CardContent>
            </Card>

            <Card className="sky-card floating-element">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-sky-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white">{avgRating.toFixed(1)}</div>
                <p className="text-xs text-white/60 mt-1">Performance score</p>
              </CardContent>
            </Card>

            <Card className="sky-card floating-element">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Departments</CardTitle>
                <TrendingUp className="h-4 w-4 text-sky-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white">{departmentStats.length}</div>
                <p className="text-xs text-white/60 mt-1">Active departments</p>
              </CardContent>
            </Card>

            <Card className="sky-card floating-element">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Bookmarked</CardTitle>
                <Bookmark className="h-4 w-4 text-sky-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white">{bookmarkedCount}</div>
                <p className="text-xs text-white/60 mt-1">Favorite employees</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="sky-card">
              <CardHeader>
                <CardTitle className="text-white">Department Performance</CardTitle>
                <p className="text-white/70 text-sm">Average ratings by department</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    averageRating: {
                      label: "Average Rating",
                      color: "#FF6B6B",
                    },
                  }}
                  className="h-[250px] sm:h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentStats} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis
                        dataKey="department"
                        tick={{ fontSize: 10, fill: "white" }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        stroke="rgba(255,255,255,0.5)"
                      />
                      <YAxis domain={[0, 5]} tick={{ fill: "white" }} stroke="rgba(255,255,255,0.5)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="averageRating" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="sky-card">
              <CardHeader>
                <CardTitle className="text-white">Performance Distribution</CardTitle>
                <p className="text-white/70 text-sm">Employee count by rating</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Employee Count",
                      color: "#4ECDC4",
                    },
                  }}
                  className="h-[250px] sm:h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="rating" tick={{ fill: "white" }} stroke="rgba(255,255,255,0.5)" />
                      <YAxis tick={{ fill: "white" }} stroke="rgba(255,255,255,0.5)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="sky-card">
              <CardHeader>
                <CardTitle className="text-white">Bookmark Status</CardTitle>
                <p className="text-white/70 text-sm">Employee bookmark distribution</p>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookmarkTrends}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bookmarkTrends.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="sky-card">
              <CardHeader>
                <CardTitle className="text-white">Department Overview</CardTitle>
                <p className="text-white/70 text-sm">Employee distribution by department</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {departmentStats.map((dept, index) => (
                    <div
                      key={dept.department}
                      className="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm bg-white/20 dark:bg-sky-800/20"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm font-medium text-white">{dept.department}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">{dept.employeeCount}</div>
                        <div className="text-xs text-white/60">{dept.averageRating.toFixed(1)} avg</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
