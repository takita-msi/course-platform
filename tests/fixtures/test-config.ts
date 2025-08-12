export const API_ENDPOINTS = {
  courses: process.env.TEST_API_COURSES || '/api/courses',
  categories: process.env.TEST_API_CATEGORIES || '/api/categories',
  videos: process.env.TEST_API_VIDEOS || '/api/videos',
} as const;

export const TEST_CONFIG = {
  baseURL: process.env.TEST_BASE_URL || 'http://localhost:3001',
  timeout: {
    action: parseInt(process.env.TEST_ACTION_TIMEOUT || '10000'),
    navigation: parseInt(process.env.TEST_NAVIGATION_TIMEOUT || '30000'),
    api: parseInt(process.env.TEST_API_TIMEOUT || '30000')
  },
  paths: {
    data: process.env.TEST_DATA_PATH || './tests/fixtures/test-data',
    screenshots: process.env.TEST_SCREENSHOT_PATH || './test-results/screenshots',
    videos: process.env.TEST_VIDEO_PATH || './test-results/videos'
  }
} as const;