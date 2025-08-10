export interface Video {
  id: string
  title: string
  youtubeId: string
  duration: string
  order: number
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  thumbnail: string
  estimatedHours: number
  videoCount: number
  videos: Video[]
}

export interface Category {
  id: string
  name: string
  color: string
  count?: number
}

export interface CourseStats {
  totalCourses: number
  totalVideos: number
  totalHours: number
  categories: number
}

// Component Props Types
export interface CourseCardProps {
  course: Course
  onClick?: (courseId: string) => void
}

export interface CategoryFilterProps {
  categories: Category[]
  selectedCategory?: string
  onCategoryChange: (categoryId: string) => void
}

export interface VideoPlayerProps {
  youtubeId: string
  title: string
  className?: string
}

export interface CurriculumProps {
  videos: Video[]
  currentVideoId?: string
  onVideoSelect: (video: Video) => void
}

export interface VideoListItemProps {
  video: Video
  isActive?: boolean
  onClick: (video: Video) => void
}

// Page Props Types
export interface CoursePageProps {
  params: Promise<{ id: string }>
}

export interface DashboardProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

// Utility Types
export type CourseWithoutVideos = Omit<Course, 'videos'>
export type VideoWithoutOrder = Omit<Video, 'order'>