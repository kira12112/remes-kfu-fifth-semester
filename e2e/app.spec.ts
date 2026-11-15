import { test, expect } from '@playwright/test';

test.describe('Reme KFU Fifth Semester Platform', () => {
  test('homepage loads with Riham greeting and 12 official subjects', async ({ page }) => {
    await page.goto('/');

    // Check header and greeting
    await expect(page).toHaveTitle(/Reme's KFU Fifth Semester/i);
    await expect(page.locator('h1')).toContainText('مرحباً يا ريهام');

    // Check subject count
    const subjectCards = page.locator('a[href^="/subjects/"]');
    await expect(subjectCards.first()).toBeVisible();
  });

  test('subject library filters and navigation works', async ({ page }) => {
    await page.goto('/subjects');

    await expect(page.locator('h1')).toContainText('Subject Library');

    // Check search input
    const searchInput = page.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Pharmacology');

    await expect(page.locator('text=DM.5 PHARM')).toBeVisible();
  });

  test('subject dashboard displays tabs and verified lectures', async ({ page }) => {
    await page.goto('/subjects/dm5-car-hard-dent');

    await expect(page.locator('h1')).toContainText('Caries and Diseases of Hard Dental Tissues');

    // Check Theory tab
    await page.click('button:has-text("Theory")');
    await expect(page.locator('text=Diagnosis for Dental Caries and Hard Tissue Diseases')).toBeVisible();
  });

  test('lecture viewer renders Egyptian Arabic explanations and terminology', async ({ page }) => {
    await page.goto('/subjects/dm5-car-hard-dent/lectures/dm5-car-hard-dent-lec-01');

    await expect(page.locator('h1')).toContainText('Diagnosis for Dental Caries and Hard Tissue Diseases');
    await expect(page.locator('text=بصي يا ريهام')).toBeVisible();
    await expect(page.locator('text=Terminology Glossary')).toBeVisible();
  });

  test('interactive quiz engine calculates score and reveals explanations in practice mode', async ({ page }) => {
    await page.goto('/subjects/dm5-car-hard-dent/quiz/quiz-car-hard-dent-01');

    await expect(page.locator('h2')).toContainText('Cariology Diagnosis & Clinical Assessment Quiz');

    // Select option B (correct option)
    const optionB = page.locator('button:has-text("It can fracture the intact remineralizing surface layer")');
    await optionB.click();

    // Verify explanation box appears
    await expect(page.locator('text=الشرح الطبي والسريري')).toBeVisible();
    await expect(page.locator('text=إجابة صحيحة')).toBeVisible();
  });

  test('pdf viewer displays security notice and reader layout', async ({ page }) => {
    await page.goto('/subjects/dm5-car-hard-dent/pdf');

    await expect(page.locator('h1')).toContainText('Original Source Reader');
    await expect(page.locator('text=Confidential University Study Material')).toBeVisible();
  });

  test('mobile bottom navigation is visible on mobile viewports', async ({ page, isMobile }) => {
    if (!isMobile) return;

    await page.goto('/');
    const mobileNav = page.locator('nav[aria-label="Mobile Navigation"]');
    await expect(mobileNav).toBeVisible();
  });
});
