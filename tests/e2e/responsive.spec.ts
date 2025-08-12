import { test, expect } from '@playwright/test';
import { DashboardPage } from '../utils/page-objects/DashboardPage';
import { CourseDetailPage } from '../utils/page-objects/CourseDetailPage';
import { viewports } from '../fixtures/test-data';

test.describe('レスポンシブデザイン', () => {
  let dashboardPage: DashboardPage;
  let courseDetailPage: CourseDetailPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    courseDetailPage = new CourseDetailPage(page);
  });

  viewports.forEach(({ name, width, height }) => {
    test(`${name}サイズでのダッシュボード表示`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await dashboardPage.goto();
      
      // 基本要素の表示確認
      await expect(dashboardPage.pageTitle).toBeVisible();
      await expect(dashboardPage.courseCards.first()).toBeVisible();
      
      // 講座カードの表示確認
      const courseCount = await dashboardPage.getCourseCount();
      expect(courseCount).toBeGreaterThan(0);
      
      // グリッドレイアウトの確認（可能であれば）
      const courseGrid = page.locator('[data-testid="course-grid"], .grid, [class*="grid"]');
      const gridExists = await courseGrid.count() > 0;
      
      if (gridExists) {
        await expect(courseGrid).toBeVisible();
      }
    });

    test(`${name}サイズでの講座詳細表示`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await dashboardPage.goto();
      await dashboardPage.clickCourseCard(0);
      
      // 基本情報の表示確認
      await expect(courseDetailPage.courseTitle).toBeVisible();
      await expect(courseDetailPage.courseDescription).toBeVisible();
      
      // 動画プレイヤーの表示確認
      await expect(courseDetailPage.videoPlayer).toBeVisible();
      
      // カリキュラムの表示確認
      await expect(courseDetailPage.curriculum).toBeVisible();
      await expect(courseDetailPage.videoItems.first()).toBeVisible();
    });

    test(`${name}サイズでのナビゲーション`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await dashboardPage.goto();
      
      // ヘッダー/ナビゲーションの表示確認
      const header = page.locator('header, [data-testid="header"]');
      const headerExists = await header.count() > 0;
      
      if (headerExists) {
        await expect(header).toBeVisible();
      }
      
      // モバイルサイズでのメニューボタン確認
      if (width <= 768) {
        const mobileMenu = page.locator('[data-testid="mobile-menu"], .hamburger, button[aria-label*="menu"]');
        const mobileMenuExists = await mobileMenu.count() > 0;
        
        if (mobileMenuExists) {
          await expect(mobileMenu).toBeVisible();
        }
      }
    });
  });

  test('ビューポート変更時の適応性', async ({ page }) => {
    await dashboardPage.goto();
    
    // デスクトップサイズで開始
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // タブレットサイズに変更
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // モバイルサイズに変更
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // 再度デスクトップサイズに戻す
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(dashboardPage.courseCards.first()).toBeVisible();
  });

  test('タッチ操作のテスト（モバイル）', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await dashboardPage.goto();
    
    // タッチデバイスエミュレーション
    await page.emulateMedia({ media: 'screen' });
    
    // 講座カードのタップ操作
    const firstCourseCard = dashboardPage.courseCards.first();
    await expect(firstCourseCard).toBeVisible();
    
    // タップ（クリック）操作
    await firstCourseCard.tap();
    await expect(page).toHaveURL(/\/course\/.+/);
    
    // 講座詳細ページでのタップ操作
    await expect(courseDetailPage.videoItems.first()).toBeVisible();
    await courseDetailPage.videoItems.first().tap();
  });

  test('スクロール動作の確認', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await dashboardPage.goto();
    
    // ページの下部までスクロール
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // スクロール後も要素が正常に表示されることを確認
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // ページの上部に戻る
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    
    await expect(dashboardPage.pageTitle).toBeVisible();
  });

  test('横向き・縦向きの表示テスト', async ({ page }) => {
    // 縦向き（ポートレート）
    await page.setViewportSize({ width: 375, height: 667 });
    await dashboardPage.goto();
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // 横向き（ランドスケープ）
    await page.setViewportSize({ width: 667, height: 375 });
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // 講座詳細ページでも確認
    await dashboardPage.clickCourseCard(0);
    await expect(courseDetailPage.courseTitle).toBeVisible();
    await expect(courseDetailPage.videoPlayer).toBeVisible();
  });

  test('極端なビューポートサイズでの表示', async ({ page }) => {
    // 非常に狭い幅
    await page.setViewportSize({ width: 320, height: 568 });
    await dashboardPage.goto();
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // 非常に広い幅
    await page.setViewportSize({ width: 2560, height: 1440 });
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // 非常に高い画面
    await page.setViewportSize({ width: 1024, height: 2000 });
    await expect(dashboardPage.courseCards.first()).toBeVisible();
  });
});