import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(duration: string): string {
  // Convert duration string like "15:30" to "15分30秒"
  const [minutes, seconds] = duration.split(':')
  const min = parseInt(minutes, 10)
  const sec = parseInt(seconds, 10)
  
  if (min === 0) return `${sec}秒`
  if (sec === 0) return `${min}分`
  return `${min}分${sec}秒`
}

export function formatHours(hours: number): string {
  if (hours < 1) {
    const minutes = Math.round(hours * 60)
    return `${minutes}分`
  }
  
  const wholeHours = Math.floor(hours)
  const remainingMinutes = Math.round((hours - wholeHours) * 60)
  
  if (remainingMinutes === 0) return `${wholeHours}時間`
  return `${wholeHours}時間${remainingMinutes}分`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function getYouTubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube.com/embed/${youtubeId}`
}

export function getYouTubeThumbnailUrl(youtubeId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'): string {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}default.jpg`
}