import { CurriculumProps } from '@/types'
import VideoListItem from './VideoListItem'

export default function Curriculum({ videos, currentVideoId, onVideoSelect }: CurriculumProps) {
  const sortedVideos = [...videos].sort((a, b) => a.order - b.order)

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">カリキュラム</h2>
        <span className="text-sm text-gray-500">{videos.length}本の動画</span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {sortedVideos.map((video) => (
          <VideoListItem
            key={video.id}
            video={video}
            isActive={video.id === currentVideoId}
            onClick={onVideoSelect}
          />
        ))}
      </div>
    </div>
  )
}