import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { CoursePageProps } from '@/types'
import { getCourseById, getCourses } from '@/lib/data'
import Navigation from '@/components/layout/Navigation'
import CourseDetail from './CourseDetail'

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params
  const course = getCourseById(id)
  
  if (!course) {
    return {
      title: '講座が見つかりません | バイブCoding',
      description: '指定された講座は存在しません。'
    }
  }

  return {
    title: `${course.title} | バイブCoding`,
    description: course.description,
    keywords: [course.category, 'プログラミング', '講座', 'オンライン学習', 'バイブCoding'],
    openGraph: {
      title: course.title,
      description: course.description,
      type: 'website',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: course.description,
    },
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params
  const course = getCourseById(id)
  
  if (!course) {
    notFound()
  }
  
  return (
    <>
      <Navigation />
      <CourseDetail course={course} />
    </>
  )
}

export async function generateStaticParams() {
  const courses = getCourses()
  return courses.map((course) => ({
    id: course.id,
  }))
}