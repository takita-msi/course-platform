import { VideoListItemProps } from '@/types'
import { formatDuration } from '@/lib/utils'

export default function VideoListItem({ video, isActive = false, onClick }: VideoListItemProps) {
  return (
    <div
      onClick={() => onClick(video)}
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive
          ? 'bg-purple-50 border-2 border-purple-200 shadow-md'
          : 'bg-white border border-gray-200 hover:border-purple-200 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Video number */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          isActive
            ? 'bg-purple-600 text-white'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {video.order}
        </div>
        
        {/* Video info */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-sm line-clamp-2 ${
            isActive ? 'text-purple-900' : 'text-gray-900'
          }`}>
            {video.title}
          </h4>
          <div className="flex items-center mt-1">
            <span className={`text-xs ${
              isActive ? 'text-purple-600' : 'text-gray-500'
            }`}>
              {formatDuration(video.duration)}
            </span>
          </div>
        </div>

        {/* Play icon */}
        <div className={`flex-shrink-0 ${
          isActive ? 'text-purple-600' : 'text-gray-400'
        }`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}