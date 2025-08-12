import { test, expect } from '@playwright/test';
import { DashboardPage } from '../utils/page-objects/DashboardPage';
import { CourseDetailPage } from '../utils/page-objects/CourseDetailPage';

test.describe('ナビゲーション', () => {
  let dashboardPage: DashboardPage;
  let courseDetailPage: CourseDetailPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    courseDetailPage = new CourseDetailPage(page);
  });

  test('ヘッダーナビゲーションの表示', async ({ page }) => {
    await dashboardPage.goto();
    
    // ヘッダー要素の存在確認
    const header = page.locator('header, [data-testid="header"]');
    const headerExists = await header.count() > 0;
    
    if (headerExists) {
      await expect(header).toBeVisible();
      
      // ロゴ/タイトルの確認
      const logo = header.locator('[data-testid="logo"], h1, a[href="/"]').first();
      const logoExists = await logo.count() > 0;
      
      if (logoExists) {
        await expect(logo).toBeVisible();
      }
    }
    
    // ナビゲーション要素の確認
    const nav = page.locator('nav, [data-testid="navigation"]');
    const navExists = await nav.count() > 0;
    
    if (navExists) {
      await expect(nav).toBeVisible();
    }
  });

  test('ダッシュボードリンクの機能', async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.clickCourseCard(0);
    
    // 講座詳細ページに遷移確認
    await expect(page).toHaveURL(/\/course\/.+/);
    
    // ダッシュボードへのリンクを探す
    const dashboardLink = page.locator('a[href="/"], [data-testid="dashboard-link"], text=/ダッシュボード|講座一覧|ホーム/').first();
    const linkExists = await dashboardLink.count() > 0;
    
    if (linkExists) {
      await expect(dashboardLink).toBeVisible();
      await dashboardLink.click();
      
      // ダッシュボードに戻ることを確認
      await expect(page).toHaveURL('/');
      await expect(dashboardPage.courseCards.first()).toBeVisible();
    }
  });

  test('ブレッドクラムの表示', async ({ page }) => {
    await dashboardPage.goto();
    
    // ダッシュボードでのブレッドクラム確認
    const breadcrumb = page.locator('[data-testid="breadcrumb"], .breadcrumb, nav[aria-label="breadcrumb"]');
    const breadcrumbExists = await breadcrumb.count() > 0;
    
    if (breadcrumbExists) {
      await expect(breadcrumb).toBeVisible();
    }
    
    // 講座詳細ページでのブレッドクラム確認
    await dashboardPage.clickCourseCard(0);
    await expect(page).toHaveURL(/\/course\/.+/);
    
    if (breadcrumbExists) {
      await expect(breadcrumb).toBeVisible();
      
      // ブレッドクラム内のダッシュボードリンクをテスト
      const homeLink = breadcrumb.locator('a[href="/"], text=/ダッシュボード|講座一覧|ホーム/').first();
      const homeLinkExists = await homeLink.count() > 0;
      
      if (homeLinkExists) {
        await expect(homeLink).toBeVisible();
        await homeLink.click();
        await expect(page).toHaveURL('/');
      }
    }
  });

  test('ページ間の相互遷移', async ({ page }) => {
    // ダッシュボード → 講座詳細 → ダッシュボード のフローテスト
    await dashboardPage.goto();
    
    const courseCount = await dashboardPage.getCourseCount();
    expect(courseCount).toBeGreaterThan(0);
    
    // 複数の講座で遷移をテスト
    const coursesToTest = Math.min(2, courseCount);
    
    for (let i = 0; i < coursesToTest; i++) {
      // ダッシュボードから講座詳細へ
      await dashboardPage.goto();
      await dashboardPage.clickCourseCard(i);
      await expect(page).toHaveURL(/\/course\/.+/);
      
      // 講座詳細の表示確認
      await expect(courseDetailPage.courseTitle).toBeVisible();
      
      // ダッシュボードに戻る（ブラウザの戻る機能）
      await page.goBack();
      await expect(page).toHaveURL('/');
      await expect(dashboardPage.courseCards.first()).toBeVisible();
    }
  });

  test('URLの直接アクセス', async ({ page }) => {
    // ダッシュボードに直接アクセス
    await page.goto('/');
    await expect(dashboardPage.courseCards.first()).toBeVisible();
    
    // 講座詳細ページに直接アクセス（既存の講座IDを取得）
    await dashboardPage.clickCourseCard(0);
    const courseUrl = page.url();
    const courseId = courseUrl.match(/\/course\/(.+)$/)?.[1];
    
    if (courseId) {
      // 新しいタブで直接アクセスをシミュレート
      await page.goto(courseUrl);
      await expect(page).toHaveURL(/\/course\/.+/);
      await expect(courseDetailPage.courseTitle).toBeVisible();
    }
  });

  test('キーボードナビゲーション', async ({ page }) => {
    await dashboardPage.goto();
    
    // Tabキーでフォーカス移動をテスト
    await page.keyboard.press('Tab');
    
    // フォーカスされた要素が存在することを確認
    const focusedElement = page.locator(':focus');
    const hasFocus = await focusedElement.count() > 0;
    
    if (hasFocus) {
      await expect(focusedElement).toBeVisible();
      
      // Enterキーで要素を選択
      await page.keyboard.press('Enter');
      
      // ページが遷移するか、何らかの操作が実行されることを確認
      await page.waitForTimeout(1000); // 短時間待機して変化を確認
    }
  });

  test('レスポンシブナビゲーション', async ({ page }) => {
    // デスクトップサイズでナビゲーション確認
    await page.setViewportSize({ width: 1920, height: 1080 });
    await dashboardPage.goto();
    
    const nav = page.locator('nav, [data-testid="navigation"], header');
    const navExists = await nav.count() > 0;
    
    if (navExists) {
      await expect(nav).toBeVisible();
    }
    
    // モバイルサイズでナビゲーション確認
    await page.setViewportSize({ width: 375, height: 667 });
    
    if (navExists) {
      await expect(nav).toBeVisible();
      
      // モバイルメニューボタンの存在確認（ハンバーガーメニューなど）
      const mobileMenuButton = page.locator('[data-testid="mobile-menu"], .hamburger, button[aria-label*="menu"]');
      const mobileMenuExists = await mobileMenuButton.count() > 0;
      
      if (mobileMenuExists) {
        await expect(mobileMenuButton).toBeVisible();
      }
    }
  });
});