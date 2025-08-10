interface DashboardHeaderProps {
  totalCourses: number
  totalHours: number
}

export default function DashboardHeader({ totalCourses, totalHours }: DashboardHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        プログラミング講座
      </h1>
      <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
        YouTubeで人気のバイブCodingの動画を体系的に学習できるオンライン講座プラットフォーム
      </p>
      <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {totalCourses}講座
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {totalHours}時間以上
        </div>
      </div>
    </div>
  )
}