# コース プラットフォーム

バイブCodingのYouTube動画を体系的に学習できるオンライン講座プラットフォームです。

## 🚀 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番サーバーの起動  
npm start

# ESLint実行
npm run lint
```

## 🧪 E2Eテスト

Playwrightを使用したE2Eテストを実装しています。

```bash
# テスト実行
npm run test:e2e

# UIモードでテスト実行
npm run test:e2e:ui

# デバッグモードでテスト実行
npm run test:e2e:debug

# ヘッドフルモードでテスト実行
npm run test:e2e:headed

# テストレポート表示
npm run test:e2e:report
```

### 実装されているテストスイート

- **基本動作確認** (`tests/e2e/simple.spec.ts`)
  - ダッシュボードの表示
  - 講座カードの基本情報表示
  - 講座詳細ページへの遷移
  - カテゴリーフィルターの表示
  - 404ページの表示

- **ダッシュボードテスト** (`tests/e2e/dashboard.spec.ts`)
  - 講座一覧の表示とフィルタリング機能
  - レスポンシブデザインの確認

- **講座詳細テスト** (`tests/e2e/course-detail.spec.ts`)
  - 講座情報の表示
  - カリキュラムの表示
  - 動画プレイヤーの表示

- **ナビゲーションテスト** (`tests/e2e/navigation.spec.ts`)
  - ヘッダーナビゲーション
  - ページ間の遷移

- **レスポンシブテスト** (`tests/e2e/responsive.spec.ts`)
  - デスクトップ、タブレット、モバイルでの表示確認

## 🏗️ 技術スタック

- **フレームワーク**: Next.js 15.4.6
- **React**: 19.1.0
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **フォント**: Geist (sans & mono)
- **テスト**: Playwright
- **リンター**: ESLint

## 📁 プロジェクト構成

```
course-platform/
├── src/
│   ├── app/              # App Router ページ
│   ├── components/       # Reactコンポーネント
│   ├── data/            # 静的データ（JSON）
│   ├── hooks/           # カスタムフック
│   ├── lib/             # ユーティリティ関数
│   └── types/           # 型定義
├── tests/
│   ├── e2e/             # E2Eテストファイル
│   ├── fixtures/        # テストデータ
│   └── utils/           # テストユーティリティ
├── public/              # 静的アセット
└── playwright.config.ts # Playwright設定
```

## 🎯 主な機能

- **講座一覧表示**: カテゴリー別のフィルタリング機能
- **講座詳細ページ**: YouTube動画の埋め込み、カリキュラム表示
- **レスポンシブデザイン**: モバイル、タブレット、デスクトップ対応
- **モダンUI**: David Langarica風の洗練されたデザイン

## 📱 対応デバイス

- デスクトップ (1920x1080以上)
- タブレット (768x1024)
- スマートフォン (375x667)
