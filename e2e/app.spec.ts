import { test, expect } from '@playwright/test';

test.describe('LLM Quest App', () => {
  test('should load with styles and show welcome screen', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/LLM Quest/);
    
    // Check welcome screen is visible
    const welcomeScreen = page.locator('#welcome');
    await expect(welcomeScreen).toBeVisible();
    
    // Check avatar is shown
    const avatar = page.locator('.wizard-avatar');
    await expect(avatar).toBeVisible();
    await expect(avatar).toContainText('🧙');
    
    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('LLM Quest');
    
    // Check tagline
    const tagline = page.locator('.tagline');
    await expect(tagline).toContainText('Learn the magic of LLMs');
    
    // Check Begin Journey button (use specific text)
    const beginBtn = page.getByRole('button', { name: 'Begin Journey' });
    await expect(beginBtn).toBeVisible();
  });

  test('should apply CSS styles correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check background color is applied
    const body = page.locator('body');
    const bgColor = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    
    // Check font is applied
    const fontFamily = await body.evaluate(el => 
      window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily).toContain('Quicksand');
    
    // Check welcome screen has proper styling
    const welcomeScreen = page.locator('#welcome');
    const textAlign = await welcomeScreen.evaluate(el => 
      window.getComputedStyle(el).textAlign
    );
    expect(textAlign).toBe('center');
  });

  test('should navigate to levels when clicking Begin Journey', async ({ page }) => {
    await page.goto('/');
    
    // Click Begin Journey button (use specific selector)
    const beginBtn = page.getByRole('button', { name: 'Begin Journey' });
    await beginBtn.click();
    
    // Wait for levels screen to appear
    const levelsScreen = page.locator('#levels');
    await expect(levelsScreen).toBeVisible();
    
    // Check level grid is rendered
    const levelGrid = page.locator('.level-grid');
    await expect(levelGrid).toBeVisible();
    
    // Should have multiple level cards
    const levelCards = page.locator('.level-card');
    const count = await levelCards.count();
    expect(count).toBeGreaterThan(0);
  });
});
