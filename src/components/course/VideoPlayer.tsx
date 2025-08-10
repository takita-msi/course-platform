import { VideoPlayerProps } from '@/types'

export default function VideoPlayer({ youtubeId, title, className = '' }: VideoPlayerProps) {
  return (
    <div className={`aspect-video w-full ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        title={title}
        className="w-full h-full rounded-lg shadow-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}