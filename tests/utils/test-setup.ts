import { Page } from '@playwright/test';
import { TEST_CONFIG } from '../fixtures/test-config';

/**
 * テストセットアップユーティリティ
 */
export class TestSetup {
  /**
   * 環境変数の検証
   */
  static validateEnvironment(): void {
    const requiredVars = ['TEST_BASE_URL'];
    const missing = requiredVars.filter(varName => !process.env[varName] && !TEST_CONFIG.baseURL);
    
    if (missing.length > 0) {
      throw new Error(`必要な環境変数が設定されていません: ${missing.join(', ')}`);
    }
  }

  /**
   * ページの共通セットアップ
   */
  static async setupPage(page: Page): Promise<void> {
    // コンソールエラーをキャッチ
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('Browser console error:', msg.text());
      }
    });

    // ネットワークエラーをキャッチ
    page.on('response', response => {
      if (!response.ok() && response.status() >= 400) {
        console.warn(`Network error: ${response.status()} ${response.url()}`);
      }
    });

    // 未処理の例外をキャッチ
    page.on('pageerror', error => {
      console.error('Page error:', error.message);
    });
  }

  /**
   * テスト用データの注入
   */
  static async injectTestData(page: Page): Promise<void> {
    await page.addInitScript(() => {
      // テスト用のグローバルデータを注入
      (window as any).__TEST_MODE__ = true;
      (window as any).__TEST_DATA__ = {
        courses: [],
        categories: [],
        videos: []
      };
    });
  }

  /**
   * ローカルストレージのクリア
   */
  static async clearStorage(page: Page): Promise<void> {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }
}