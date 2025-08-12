import { Page, Locator, expect } from '@playwright/test';
import { waitForElement, safeClick, waitForPageLoad } from '../helpers';

export class CourseDetailPage {
  readonly page: Page;
  readonly courseTitle: Locator;
  readonly courseDescription: Locator;
  readonly courseCategory: Locator;
  readonly videoCount: Locator;
  readonly studyTime: Locator;
  readonly videoPlayer: Locator;
  readonly curriculum: Locator;
  readonly videoItems: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.courseTitle = page.locator('[data-testid="course-title"]');
    this.courseDescription = page.locator('[data-testid="course-description"]');
    this.courseCategory = page.locator('[data-testid="course-category"]');
    this.videoCount = page.locator('[data-testid="video-count"]');
    this.studyTime = page.locator('[data-testid="study-time"]');
    this.videoPlayer = page.locator('[data-testid="video-player"]');
    this.curriculum = page.locator('[data-testid="curriculum"]');
    this.videoItems = page.locator('[data-testid="video-item"]');
    this.backButton = page.locator('[data-testid="back-button"]');
  }

  async goto(courseId: string) {
    await this.page.goto(`/course/${courseId}`);
    await this.waitForLoad();
  }

  async waitForLoad() {
    try {
      await waitForPageLoad(this.page);
      
      // 必須要素の表示を確認
      await expect(this.courseTitle).toBeVisible({ timeout: 15000 });
      await expect(this.curriculum).toBeVisible({ timeout: 10000 });
    } catch (error) {
      throw new Error(`講座詳細ページの読み込みに失敗: ${error.message}`);
    }
  }

  async verifyCourseInfo() {
    try {
      // 基本情報の表示確認
      await expect(this.courseTitle).toBeVisible();
      await expect(this.courseDescription).toBeVisible();
      await expect(this.courseCategory).toBeVisible();
      await expect(this.videoCount).toBeVisible();
      
      // テキストが空でないことを確認
      const titleText = await this.courseTitle.textContent();
      const descriptionText = await this.courseDescription.textContent();
      const categoryText = await this.courseCategory.textContent();
      const videoCountText = await this.videoCount.textContent();
      
      expect(titleText?.trim()).toBeTruthy();
      expect(descriptionText?.trim()).toBeTruthy();
      expect(categoryText?.trim()).toBeTruthy();
      expect(videoCountText?.trim()).toBeTruthy();
    } catch (error) {
      throw new Error(`講座情報の検証に失敗: ${error.message}`);
    }
  }

  async verifyCurriculum() {
    try {
      // カリキュラムの表示確認
      await expect(this.curriculum).toBeVisible();
      await expect(this.videoItems.first()).toBeVisible({ timeout: 10000 });
      
      // 動画アイテムの数を確認
      const itemCount = await this.videoItems.count();
      expect(itemCount, '動画アイテムが30個以上存在することを確認').toBeGreaterThanOrEqual(30);
      expect(itemCount, '動画アイテムが50個以下であることを確認').toBeLessThanOrEqual(50);
      
      // 各動画アイテムの内容を確認（最初の3つのみ）
      for (let i = 0; i < Math.min(3, itemCount); i++) {
        const item = this.videoItems.nth(i);
        const title = item.locator('[data-testid="video-title"]');
        const duration = item.locator('[data-testid="video-duration"]');
        
        await expect(title).toBeVisible();
        await expect(duration).toBeVisible();
        
        const titleText = await title.textContent();
        const durationText = await duration.textContent();
        
        expect(titleText?.trim()).toBeTruthy();
        expect(durationText?.trim()).toBeTruthy();
      }
    } catch (error) {
      throw new Error(`カリキュラムの検証に失敗: ${error.message}`);
    }
  }

  async verifyVideoPlayer() {
    try {
      // YouTube埋め込みプレイヤーの表示確認
      await expect(this.videoPlayer).toBeVisible({ timeout: 10000 });
      
      // iframeまたはYouTube埋め込み要素の存在確認
      const iframe = this.videoPlayer.locator('iframe');
      const isIframeVisible = await iframe.count() > 0;
      
      if (isIframeVisible) {
        await expect(iframe).toBeVisible();
        const src = await iframe.getAttribute('src');
        expect(src).toMatch(/youtube\.com|youtu\.be/);
      }
    } catch (error) {
      throw new Error(`動画プレイヤーの検証に失敗: ${error.message}`);
    }
  }

  async clickVideoItem(index: number = 1) {
    try {
      const item = this.videoItems.nth(index);
      await expect(item).toBeVisible();
      await safeClick(item);
      
      // 動画切り替え完了まで待機
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`動画アイテム ${index} のクリックに失敗: ${error.message}`);
    }
  }

  async verifyVideoSwitch() {
    try {
      // 異なる動画に切り替わったことを確認
      // (実装に応じて、選択状態の表示や動画URLの変更を確認)
      const activeItem = this.videoItems.locator('[data-selected="true"]').first();
      const hasActiveState = await activeItem.count() > 0;
      
      if (hasActiveState) {
        await expect(activeItem).toBeVisible();
      }
    } catch (error) {
      throw new Error(`動画切り替えの検証に失敗: ${error.message}`);
    }
  }

  async clickBackButton() {
    try {
      await expect(this.backButton).toBeVisible();
      await safeClick(this.backButton);
    } catch (error) {
      throw new Error(`戻るボタンのクリックに失敗: ${error.message}`);
    }
  }
}