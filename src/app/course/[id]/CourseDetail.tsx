'use client'

import { useState } from 'react'
import { Course, Video } from '@/types'
import CourseHeader from '@/components/course/CourseHeader'
import VideoPlayer from '@/components/course/VideoPlayer'
import Curriculum from '@/components/course/Curriculum'

interface CourseDetailProps {
  course: Course
}

export default function CourseDetail({ course }: CourseDetailProps) {
  const [currentVideo, setCurrentVideo] = useState<Video>(
    course.videos.find(v => v.order === 1) || course.videos[0]
  )

  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CourseHeader course={course} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentVideo.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  第{currentVideo.order}話 • {currentVideo.duration}
                </p>
              </div>
              
              <VideoPlayer
                youtubeId={currentVideo.youtubeId}
                title={currentVideo.title}
              />
            </div>
          </div>

          {/* Curriculum Section */}
          <div className="lg:col-span-1">
            <Curriculum
              videos={course.videos}
              currentVideoId={currentVideo.id}
              onVideoSelect={handleVideoSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}