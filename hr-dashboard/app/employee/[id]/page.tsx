"use client"

import { useParams } from "next/navigation"
import { useUsers } from "@/hooks/useUsers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarRating } from "@/components/ui/star-rating"
import { useAppStore } from "@/lib/store"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Mail, Phone, MapPin, Bookmark } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EmployeeDetailPage() {
  const params = useParams()
  const users = useUsers()
  const { toggleBookmark } = useAppStore()

  const user = users.find((u) => u.id === Number.parseInt(params.id as string))

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Employee not found.</p>
        <Button asChild className="mt-4">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="sky-theme min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="sky-card">
                <CardHeader className="text-center">
                  <Image
                    src={user.image || "/placeholder.svg"}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4"
                  />
                  <CardTitle className="text-2xl">
                    {user.firstName} {user.lastName}
                  </CardTitle>
                  <p className="text-muted-foreground">{user.company.title}</p>
                  <Badge
                    variant="secondary"
                    className="backdrop-blur-sm bg-white/40 dark:bg-sky-800/40 text-sky-800 dark:text-sky-100 border-sky-300/50"
                  >
                    {user.company.department}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Performance Rating</span>
                    <StarRating rating={user.performance} />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {user.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {user.address.city}, {user.address.state}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="sky-button-outline w-full"
                    onClick={() => toggleBookmark(user.id)}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${user.isBookmarked ? "fill-current" : ""}`} />
                    {user.isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card className="sky-card">
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{user.bio}</p>
                    </CardContent>
                  </Card>

                  <Card className="sky-card">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground">
                          {user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Age</p>
                        <p className="text-muted-foreground">{user.age} years old</p>
                      </div>
                      <div>
                        <p className="font-medium">Company</p>
                        <p className="text-muted-foreground">{user.company.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  {user.projects.map((project) => (
                    <Card key={project.id} className="sky-card">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <Badge
                            variant={
                              project.status === "completed"
                                ? "default"
                                : project.status === "active"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-sky-200/50 dark:bg-sky-800/50 rounded-full h-2">
                            <div className="bg-sky-500 h-2 rounded-full" style={{ width: `${project.progress}%` }} />
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Started: {formatDate(project.startDate)}</span>
                            {project.endDate && <span>Due: {formatDate(project.endDate)}</span>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="feedback" className="space-y-4">
                  {user.feedback.map((feedback) => (
                    <Card key={feedback.id} className="sky-card">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{feedback.reviewer}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(feedback.date)}</p>
                          </div>
                          <StarRating rating={feedback.rating} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feedback.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
