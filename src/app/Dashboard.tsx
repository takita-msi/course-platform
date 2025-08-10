'use client'

import { useState } from 'react'
import { Course, Category } from '@/types'
import CategoryFilter from '@/components/course/CategoryFilter'
import CourseGrid from '@/components/course/CourseGrid'
import DashboardHeader from '@/components/layout/DashboardHeader'

interface DashboardClientProps {
  initialCourses: Course[]
  categories: Category[]
  totalHours: number
}

export default function DashboardClient({ 
  initialCourses, 
  categories, 
  totalHours 
}: DashboardClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const filteredCourses = getCoursesByCategoryLocal(initialCourses, selectedCategory)
  
  return (
    <>
      <DashboardHeader 
        totalCourses={initialCourses.length} 
        totalHours={totalHours} 
      />
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <CourseGrid courses={filteredCourses} />
    </>
  )
}

// Utility function to filter courses by category
function getCoursesByCategoryLocal(courses: Course[], categoryId: string): Course[] {
  if (categoryId === 'all') return courses
  return courses.filter(course => course.category === categoryId)
}