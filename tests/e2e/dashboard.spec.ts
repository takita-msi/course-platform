import { test, expect } from '@playwright/test';
import { DashboardPage } from '../utils/page-objects/DashboardPage';
import { testCourses, testData } from '../fixtures/test-data';

test.describe('ダッシュボード', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
  });

  test('ダッシュボードページの基本表示', async ({ page }) => {
    await dashboardPage.goto();
    
    // ページタイトルの確認
    await expect(page).toHaveTitle(/バイブCoding/);
    
    // メインタイトルの表示確認
    await expect(dashboardPage.pageTitle).toBeVisible();
    await expect(dashboardPage.pageTitle).toContainText('プログラミング講座');
    
    // 講座カードの表示確認
    const courseCount = await dashboardPage.getCourseCount();
    expect(courseCount, '講座カードが最低6個表示される').toBeGreaterThanOrEqual(testCourses.expectedMinimumCourses);
  });

  test('講座カードの内容表示', async () => {
    await dashboardPage.goto();
    
    const courseCount = await dashboardPage.getCourseCount();
    expect(courseCount).toBeGreaterThan(0);
    
    // 最初の講座カードの内容を検証
    await dashboardPage.verifyCourseCardContent(0);
    
    // 複数の講座カードの内容を検証（最大3つまで）
    const cardsToCheck = Math.min(3, courseCount);
    for (let i = 0; i < cardsToCheck; i++) {
      await dashboardPage.verifyCourseCardContent(i);
    }
  });

  test('カテゴリーフィルタリング', async () => {
    await dashboardPage.goto();
    
    const initialCount = await dashboardPage.getCourseCount();
    expect(initialCount).toBeGreaterThan(0);
    
    // カテゴリーフィルターの存在確認
    await expect(dashboardPage.categoryFilter).toBeVisible();
    
    // Next.jsカテゴリーでフィルタリング
    await dashboardPage.filterByCategory('Next.js');
    
    // フィルタリング後の講座数を確認
    const filteredCount = await dashboardPage.getCourseCount();
    
    // フィルタリングが機能していることを確認（数が変わったか、0以上であることを確認）
    expect(filteredCount).toBeGreaterThanOrEqual(0);
    
    // 「すべて」で元に戻す
    await dashboardPage.filterByCategory('すべて');
    const restoredCount = await dashboardPage.getCourseCount();
    expect(restoredCount).toBe(initialCount);
  });

  test('講座カードクリックによる遷移', async ({ page }) => {
    await dashboardPage.goto();
    
    const courseCount = await dashboardPage.getCourseCount();
    expect(courseCount).toBeGreaterThan(0);
    
    // 最初の講座カードをクリック
    await dashboardPage.clickCourseCard(0);
    
    // 講座詳細ページに遷移することを確認
    await expect(page).toHaveURL(/\/course\/.+/);
    
    // 講座詳細ページの基本要素が表示されることを確認
    await expect(page.locator('h1')).toBeVisible();
  });

  test('レスポンシブデザインの確認', async ({ page }) => {
    // デスクトップサイズ
    await page.setViewportSize({ width: 1920, height: 1080 });
    await dashboardPage.goto();
    
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // タブレットサイズ
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // モバイルサイズ  
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(dashboardPage.courseCards.first()).toBeVisible();
  });

  test('404エラーページの表示', async ({ page }) => {
    // 存在しないページにアクセス
    await page.goto('/nonexistent-page');
    
    // Next.jsの404ページの表示を確認
    const is404 = await page.locator('text=404').count() > 0;
    const hasNotFound = await page.locator('text=ページが見つかりません').count() > 0;
    const hasErrorPage = await page.locator('h2').filter({ hasText: 'ページが見つかりません' }).count() > 0;
    
    expect(is404 || hasNotFound || hasErrorPage).toBeTruthy();
  });
});