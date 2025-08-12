import { Page, Locator, expect } from '@playwright/test';
import { waitForElement, safeClick, waitForPageLoad } from '../helpers';

export class DashboardPage {
  readonly page: Page;
  readonly courseCards: Locator;
  readonly categoryFilter: Locator;
  readonly pageTitle: Locator;
  readonly loadingIndicator: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.courseCards = page.locator('a[href^="/course/"]');
    this.categoryFilter = page.locator('.flex.flex-wrap.gap-2.mb-8');
    this.pageTitle = page.locator('h1');
    this.loadingIndicator = page.locator('.animate-spin');
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  async goto() {
    await this.page.goto('/');
    await this.waitForLoad();
  }

  async waitForLoad() {
    try {
      await waitForPageLoad(this.page);
      
      // ローディングインジケーターが存在する場合は非表示まで待機
      const loadingExists = await this.loadingIndicator.count() > 0;
      if (loadingExists) {
        await expect(this.loadingIndicator).toBeHidden({ timeout: 15000 });
      }

      // 講座カードの表示を確認
      await expect(this.courseCards.first()).toBeVisible({ timeout: 15000 });
      await expect(this.pageTitle).toBeVisible();
    } catch (error) {
      throw new Error(`ダッシュボードの読み込みに失敗: ${error.message}`);
    }
  }

  async filterByCategory(categoryName: string) {
    try {
      const filterButton = this.categoryFilter.getByRole('button', { name: categoryName });
      await expect(filterButton).toBeVisible();
      await safeClick(filterButton);
      
      // フィルタリング完了まで待機
      await this.page.waitForTimeout(1000); // 短時間の待機でUI更新を待つ
      
      // ローディング状態があれば待機
      const loadingExists = await this.loadingIndicator.count() > 0;
      if (loadingExists) {
        await expect(this.loadingIndicator).toBeHidden({ timeout: 10000 });
      }
    } catch (error) {
      throw new Error(`カテゴリー "${categoryName}" でのフィルタリングに失敗: ${error.message}`);
    }
  }

  async getCourseCount(): Promise<number> {
    try {
      await expect(this.courseCards.first()).toBeVisible();
      return await this.courseCards.count();
    } catch (error) {
      // 講座が0件の場合もあるので、エラーを投げずに0を返す
      return 0;
    }
  }

  async clickCourseCard(index: number = 0) {
    try {
      const card = this.courseCards.nth(index);
      await expect(card).toBeVisible();
      await safeClick(card);
    } catch (error) {
      throw new Error(`講座カード ${index} のクリックに失敗: ${error.message}`);
    }
  }

  async verifyCourseCardContent(index: number = 0) {
    try {
      const card = this.courseCards.nth(index);
      await expect(card).toBeVisible();
      
      // 講座カード内の必須要素を確認
      const title = card.locator('h3');
      const category = card.locator('span').first(); 
      const videoCount = card.locator('span').filter({ hasText: '本' });
      
      await expect(title).toBeVisible();
      await expect(category).toBeVisible();
      await expect(videoCount).toBeVisible();
      
      // テキストが空でないことを確認
      const titleText = await title.textContent();
      const categoryText = await category.textContent();
      const videoCountText = await videoCount.textContent();
      
      expect(titleText?.trim()).toBeTruthy();
      expect(categoryText?.trim()).toBeTruthy(); 
      expect(videoCountText?.trim()).toBeTruthy();
    } catch (error) {
      throw new Error(`講座カード ${index} の内容検証に失敗: ${error.message}`);
    }
  }
}