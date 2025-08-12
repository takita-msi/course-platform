import { TestInfo, Page } from '@playwright/test';
import { TEST_CONFIG } from '../fixtures/test-config';

/**
 * テストエラーハンドリングユーティリティ
 */
export class ErrorHandlers {
  /**
   * テスト失敗時のスクリーンショット撮影
   */
  static async captureFailureScreenshot(
    page: Page, 
    testInfo: TestInfo
  ): Promise<void> {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `${TEST_CONFIG.paths.screenshots}/${testInfo.title}-failure-${Date.now()}.png`;
      
      try {
        await page.screenshot({ 
          path: screenshotPath,
          fullPage: true
        });
        console.log(`スクリーンショット保存: ${screenshotPath}`);
      } catch (error) {
        console.error('スクリーンショット撮影に失敗:', error);
      }
    }
  }

  /**
   * テスト失敗時のDOM状態の保存
   */
  static async captureDOMState(
    page: Page, 
    testInfo: TestInfo
  ): Promise<void> {
    if (testInfo.status !== testInfo.expectedStatus) {
      try {
        const html = await page.content();
        const domStatePath = `${TEST_CONFIG.paths.screenshots}/${testInfo.title}-dom-state-${Date.now()}.html`;
        
        // ファイルシステムAPIが利用できる場合のみ保存
        if (typeof require !== 'undefined') {
          const fs = require('fs');
          const path = require('path');
          
          // ディレクトリが存在しない場合は作成
          const dir = path.dirname(domStatePath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          
          fs.writeFileSync(domStatePath, html);
          console.log(`DOM状態保存: ${domStatePath}`);
        }
      } catch (error) {
        console.error('DOM状態の保存に失敗:', error);
      }
    }
  }

  /**
   * ネットワークログの収集
   */
  static setupNetworkLogging(page: Page): void {
    const networkLogs: Array<{
      url: string;
      method: string;
      status: number;
      timestamp: number;
    }> = [];

    page.on('request', request => {
      networkLogs.push({
        url: request.url(),
        method: request.method(),
        status: 0, // リクエスト時点では不明
        timestamp: Date.now()
      });
    });

    page.on('response', response => {
      const log = networkLogs.find(log => 
        log.url === response.url() && log.status === 0
      );
      if (log) {
        log.status = response.status();
      }
    });

    // ログをページオブジェクトに保存
    (page as any).__networkLogs = networkLogs;
  }

  /**
   * ネットワークログの出力
   */
  static async outputNetworkLogs(
    page: Page, 
    testInfo: TestInfo
  ): Promise<void> {
    if (testInfo.status !== testInfo.expectedStatus) {
      const networkLogs = (page as any).__networkLogs || [];
      
      if (networkLogs.length > 0) {
        console.log('=== Network Logs ===');
        networkLogs.forEach((log: any) => {
          console.log(`${log.method} ${log.url} - ${log.status}`);
        });
        console.log('==================');
      }
    }
  }

  /**
   * カスタムエラーメッセージの生成
   */
  static createDetailedErrorMessage(
    testName: string,
    expectedBehavior: string,
    actualBehavior: string,
    additionalContext?: string
  ): string {
    let message = `テスト失敗: ${testName}\n`;
    message += `期待される動作: ${expectedBehavior}\n`;
    message += `実際の動作: ${actualBehavior}`;
    
    if (additionalContext) {
      message += `\n追加情報: ${additionalContext}`;
    }
    
    return message;
  }
}