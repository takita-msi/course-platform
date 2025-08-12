import { Page, Locator, expect } from '@playwright/test';

export async function waitForElement(
  page: Page, 
  selector: string, 
  timeout = 10000
): Promise<Locator> {
  try {
    await page.waitForSelector(selector, { timeout });
    return page.locator(selector);
  } catch (error) {
    throw new Error(`要素 "${selector}" が見つかりません: ${error.message}`);
  }
}

export async function safeClick(element: Locator): Promise<void> {
  try {
    await expect(element).toBeVisible();
    await element.click();
  } catch (error) {
    throw new Error(`要素のクリックに失敗: ${error.message}`);
  }
}

export async function waitForNetworkIdle(page: Page, timeout = 10000): Promise<void> {
  try {
    await page.waitForLoadState('networkidle', { timeout });
  } catch (error) {
    throw new Error(`ネットワークの待機に失敗: ${error.message}`);
  }
}

export async function getTextContent(element: Locator): Promise<string> {
  try {
    const text = await element.textContent();
    return text?.trim() || '';
  } catch (error) {
    throw new Error(`テキスト取得に失敗: ${error.message}`);
  }
}

export async function waitForPageLoad(page: Page, timeout = 30000): Promise<void> {
  try {
    await page.waitForLoadState('domcontentloaded', { timeout });
    await page.waitForLoadState('networkidle', { timeout: timeout / 2 });
  } catch (error) {
    throw new Error(`ページ読み込み待機に失敗: ${error.message}`);
  }
}