import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { User, Project, Feedback } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateMockData(user: any): User {
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"]
  const projects: Project[] = Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, i) => ({
    id: `proj-${user.id}-${i}`,
    name: `Project ${String.fromCharCode(65 + i)}`,
    status: ["active", "completed", "on-hold"][Math.floor(Math.random() * 3)] as any,
    progress: Math.floor(Math.random() * 100),
    startDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    endDate:
      Math.random() > 0.5
        ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
        : undefined,
  }))

  const feedback: Feedback[] = Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => ({
    id: `feedback-${user.id}-${i}`,
    date: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    rating: Math.floor(Math.random() * 5) + 1,
    comment: [
      "Excellent work on the recent project deliverables.",
      "Shows great leadership potential and team collaboration.",
      "Needs improvement in time management and deadline adherence.",
      "Outstanding technical skills and problem-solving abilities.",
      "Great communication skills and client interaction.",
    ][Math.floor(Math.random() * 5)],
    reviewer: ["John Smith", "Sarah Johnson", "Mike Davis", "Lisa Chen", "David Wilson"][Math.floor(Math.random() * 5)],
  }))

  return {
    ...user,
    company: {
      ...user.company,
      department: departments[Math.floor(Math.random() * departments.length)],
    },
    performance: Math.floor(Math.random() * 5) + 1,
    bio: `Experienced professional with ${Math.floor(Math.random() * 10) + 1} years in ${user.company?.department || "Technology"}. Passionate about innovation and team collaboration.`,
    projects,
    feedback,
    isBookmarked: false,
  }
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
