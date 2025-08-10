import Link from 'next/link'
import { CourseCardProps } from '@/types'
import { formatHours } from '@/lib/utils'

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const cardContent = (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🎥</div>
            <p className="text-gray-500 text-sm">{course.title}</p>
          </div>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-medium px-3 py-1 rounded-full border border-purple-200">
            {course.category === 'nextjs' && 'Next.js'}
            {course.category === 'cloud-code' && 'Cloud Code'}
            {course.category === 'react' && 'React'}
            {course.category === 'typescript' && 'TypeScript'}
            {course.category === 'fullstack' && 'フルスタック'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {course.videoCount}本
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatHours(course.estimatedHours)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  if (onClick) {
    return (
      <div onClick={() => onClick(course.id)}>
        {cardContent}
      </div>
    )
  }

  return (
    <Link href={`/course/${course.id}`}>
      {cardContent}
    </Link>
  )
}