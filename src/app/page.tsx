import Navigation from '@/components/layout/Navigation'
import DashboardClient from './Dashboard'
import { getCourses, getCategories, getCourseStats } from '@/lib/data'

export default function Home() {
  const courses = getCourses()
  const categories = getCategories()
  const stats = getCourseStats()

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardClient 
          initialCourses={courses}
          categories={categories}
          totalHours={stats.totalHours}
        />
      </main>
    </>
  )
}
