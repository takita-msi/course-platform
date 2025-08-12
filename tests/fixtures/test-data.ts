export const testCourses = {
  expectedMinimumCourses: 6,
  expectedMaximumCourses: 20,
  videosPerCourse: {
    min: 30,
    max: 50
  }
} as const;

export const testCategories = [
  'Next.js',
  'React',
  'TypeScript',
  'JavaScript'
] as const;

export const testData = {
  pageTitle: 'バイブCoding講座プラットフォーム',
  dashboardTitle: '講座一覧',
  courseDetailElements: [
    'course-title',
    'course-description', 
    'course-category',
    'video-count',
    'study-time'
  ],
  curriculumElements: [
    'video-list',
    'video-item',
    'video-title',
    'video-duration'
  ]
} as const;

export const viewports = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 667 },
] as const;