'use client'

import { CategoryFilterProps } from '@/types'

export default function CategoryFilter({ 
  categories, 
  selectedCategory = 'all', 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-200 hover:bg-purple-50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}