export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  phone: string
  address: {
    address: string
    city: string
    state: string
    postalCode: string
  }
  company: {
    department: string
    name: string
    title: string
  }
  image: string
  // Custom fields for HR dashboard
  performance: number // 1-5 rating
  bio: string
  projects: Project[]
  feedback: Feedback[]
  isBookmarked: boolean
}

export interface Project {
  id: string
  name: string
  status: "active" | "completed" | "on-hold"
  progress: number
  startDate: string
  endDate?: string
}

export interface Feedback {
  id: string
  date: string
  rating: number
  comment: string
  reviewer: string
}

export interface DepartmentStats {
  department: string
  averageRating: number
  employeeCount: number
}
