// Re-export all types from course.ts
export type {
  Video,
  Course,
  Category,
  CourseStats,
  CourseCardProps,
  CategoryFilterProps,
  VideoPlayerProps,
  CurriculumProps,
  VideoListItemProps,
  CoursePageProps,
  DashboardProps,
  CourseWithoutVideos,
  VideoWithoutOrder,
} from './course'

// Common utility types
export interface BaseComponent {
  className?: string
  children?: React.ReactNode
}

export interface PageLayout {
  title?: string
  description?: string
  showBackButton?: boolean
}