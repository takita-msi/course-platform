import { test, expect } from '@playwright/test';
import { DashboardPage } from '../utils/page-objects/DashboardPage';
import { CourseDetailPage } from '../utils/page-objects/CourseDetailPage';
import { testCourses } from '../fixtures/test-data';

test.describe('講座詳細ページ', () => {
  let dashboardPage: DashboardPage;
  let courseDetailPage: CourseDetailPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    courseDetailPage = new CourseDetailPage(page);
  });

  test('講座詳細ページの基本表示', async ({ page }) => {
    // ダッシュボードから講座詳細ページに遷移
    await dashboardPage.goto();
    await dashboardPage.clickCourseCard(0);
    
    // URLが講座詳細ページになることを確認
    await expect(page).toHaveURL(/\/course\/.+/);
    
    // 基本情報の表示確認
    await courseDetailPage.verifyCourseInfo();
  });

  test('カリキュラム（動画一覧）の表示', async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.clickCourseCard(0);
    
    // カリキュラムの表示と内容を確認
    await courseDetailPage.verifyCurriculum();
  });

  test('YouTube動画プレイヤーの表示', async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.clickCourseCard(0);
    
    // 動画プレイヤーの表示確認
    await courseDetailPage.verifyVideoPlayer();
  });

  test('動画切り替え機能', async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.clickCourseCard(0);
    
    // 最初の動画プレイヤーが表示されることを確認
    await courseDetailPage.verifyVideoPlayer();
    
    // 2番目の動画アイテムをクリック
    await courseDetailPage.clickVideoItem(1);
    
    // 動画切り替えの確認（実装に応じて調整）
    await courseDetailPage.verifyVideoSwitch();
  });

  test('複数の講座での個別データ表示', async ({ page }) => {
    await dashboardPage.goto();
    
    const courseCount = await dashboardPage.getCourseCount();
    const coursesToTest = Math.min(3, courseCount);
    
    for (let i = 0; i < coursesToTest; i++) {
      // 各講座の詳細ページを確認
      await dashboardPage.goto();
      await dashboardPage.clickCourseCard(i);
      
      // 講座詳細ページの表示確認
      await expect(page).toHaveURL(/\/course\/.+/);
      await courseDetailPage.verifyCourseInfo();
      
      // 現在のURLを取得（講座ID確認のため）
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/\/course\/.+/);
    }
  });

  test('存在しない講座IDでの404エラー', async ({ page }) => {
    // 存在しない講座IDでアクセス
    await page.goto('/course/nonexistent-course-id');
    
    // 404ページまたはエラーメッセージの表示を確認
    const is404 = await page.locator('text=404').count() > 0;
    const hasErrorMessage = await page.locator('[data-testid="error-message"]').count() > 0;
    const hasNotFound = await page.locator('text=Not Found').count() > 0;
    const hasErrorPage = await page.locator('[data-testid="error-page"]').count() > 0;
    
    expect(is404 || hasErrorMessage || hasNotFound || hasErrorPage).toBeTruthy();
  });

  test('戻るボタンによるダッシュボードへの遷移', async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.clickCourseCard(0);
    
    // 講座詳細ページに遷移確認
    await expect(page).toHaveURL(/\/course\/.+/);
    
    // 戻るボタンがある場合のテスト
    const backButtonExists = await courseDetailPage.backButton.count() > 0;
    
    if (backButtonExists) {
      await courseDetailPage.clickBackButton();
      await expect(page).toHaveURL('/');
      await expect(dashboardPage.courseCards.first()).toBeVisible();
    } else {
      // 戻るボタンがない場合はブラウザの戻る機能をテスト
      await page.goBack();
      await expect(page).toHaveURL('/');
      await expect(dashboardPage.courseCards.first()).toBeVisible();
    }
  });

  test('講座詳細ページのレスポンシブデザイン', async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.clickCourseCard(0);
    
    // デスクトップサイズ
    await page.setViewportSize({ width: 1920, height: 1080 });
    await courseDetailPage.verifyCourseInfo();
    await courseDetailPage.verifyVideoPlayer();
    
    // タブレットサイズ
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(courseDetailPage.courseTitle).toBeVisible();
    await expect(courseDetailPage.videoPlayer).toBeVisible();
    
    // モバイルサイズ
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(courseDetailPage.courseTitle).toBeVisible();
    await expect(courseDetailPage.curriculum).toBeVisible();
  });
});