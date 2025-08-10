import Link from 'next/link'
import { Course } from '@/types'
import { formatHours } from '@/lib/utils'

interface CourseHeaderProps {
  course: Course
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-purple-600 transition-colors">
          講座一覧
        </Link>
        <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        <span className="text-gray-900">{course.title}</span>
      </div>

      {/* Course Info */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
            {course.category === 'nextjs' && 'Next.js'}
            {course.category === 'cloud-code' && 'Cloud Code'}
            {course.category === 'react' && 'React'}
            {course.category === 'typescript' && 'TypeScript'}
            {course.category === 'fullstack' && 'フルスタック'}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {course.title}
        </h1>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center space-x-6 text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {course.videoCount}本の動画
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          約{formatHours(course.estimatedHours)}
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          実践的な内容
        </div>
      </div>
    </div>
  )
}