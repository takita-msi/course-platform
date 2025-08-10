import { Course, Category, CourseStats, Video } from '@/types'
import coursesData from '@/data/courses.json'
import categoriesData from '@/data/categories.json'

export function getCourses(): Course[] {
  return coursesData.courses as Course[]
}

export function getCourseById(id: string): Course | undefined {
  const courses = getCourses()
  return courses.find(course => course.id === id)
}

export function getCoursesByCategory(categoryId: string): Course[] {
  const courses = getCourses()
  if (categoryId === 'all') return courses
  return courses.filter(course => course.category === categoryId)
}

export function getCategories(): Category[] {
  return categoriesData.categories as Category[]
}

export function getCategoryById(id: string): Category | undefined {
  const categories = getCategories()
  return categories.find(category => category.id === id)
}

export function getCourseStats(): CourseStats {
  const courses = getCourses()
  const categories = getCategories()
  
  const totalVideos = courses.reduce((sum, course) => sum + course.videoCount, 0)
  const totalHours = courses.reduce((sum, course) => sum + course.estimatedHours, 0)
  
  return {
    totalCourses: courses.length,
    totalVideos,
    totalHours,
    categories: categories.length,
  }
}

export function searchCourses(query: string): Course[] {
  const courses = getCourses()
  const lowerQuery = query.toLowerCase()
  
  return courses.filter(course =>
    course.title.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery) ||
    course.category.toLowerCase().includes(lowerQuery)
  )
}

export function getVideoById(courseId: string, videoId: string): Video | undefined {
  const course = getCourseById(courseId)
  if (!course) return undefined
  
  return course.videos.find(video => video.id === videoId)
}

export function getVideosByOrder(courseId: string): Video[] {
  const course = getCourseById(courseId)
  if (!course) return []
  
  return [...course.videos].sort((a, b) => a.order - b.order)
}