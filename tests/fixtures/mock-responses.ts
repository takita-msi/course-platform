export const mockResponses = {
  serverError: {
    status: 500,
    contentType: 'application/json',
    body: JSON.stringify({ 
      error: 'Internal Server Error',
      message: 'サーバー内部エラーが発生しました'
    })
  },
  notFound: {
    status: 404,
    contentType: 'application/json',
    body: JSON.stringify({ 
      error: 'Not Found',
      message: 'リソースが見つかりません'
    })
  },
  unauthorized: {
    status: 401,
    contentType: 'application/json',
    body: JSON.stringify({
      error: 'Unauthorized',
      message: '認証が必要です'
    })
  },
  badRequest: {
    status: 400,
    contentType: 'application/json',
    body: JSON.stringify({
      error: 'Bad Request',
      message: 'リクエストが不正です'
    })
  }
} as const;

// 成功レスポンスのモック
export const mockSuccessResponses = {
  courses: {
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
      {
        id: 'test-course-1',
        title: 'テストコース1',
        category: 'nextjs',
        description: 'テスト用のコース説明',
        videoCount: 30,
        estimatedHours: 20
      }
    ])
  },
  categories: {
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
      { id: 'nextjs', name: 'Next.js', color: '#000000' },
      { id: 'react', name: 'React', color: '#61DAFB' }
    ])
  }
} as const;