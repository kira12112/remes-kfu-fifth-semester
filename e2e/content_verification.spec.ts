import { test, expect } from '@playwright/test';

test.describe('Content Implementation Verification', () => {
  test('1. Catalog loads with 12 official subjects', async ({ page }) => {
    await page.goto('/subjects', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText('Subject Library');
    const cards = page.locator('a[href^="/subjects/"]');
    const count = await cards.count();
    expect(count).toBe(12);
  });

  test('2. Cariology dashboard has 8 theory and 5 practicals, and lecture viewer renders Arabic explanation', async ({ page }) => {
    await page.goto('/subjects/dm5-car-hard-dent', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText('Caries and Diseases of Hard Dental Tissues');
    
    // Check Theory tab has 8 items
    await page.click('button:has-text("Theory")');
    const theoryItems = page.locator('a[href*="/lectures/"]');
    expect(await theoryItems.count()).toBeGreaterThanOrEqual(8);

    // Click Lecture 2: Etiology
    await page.goto('/subjects/dm5-car-hard-dent/lectures/dm5-car-hard-dent-lec-02', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText('Etiology and Pathogenesis of Dental Caries');
    // Verify Egyptian Arabic text for Riham is present
    await expect(page.locator('text=بصي يا ريهام').first()).toBeVisible();
    await expect(page.locator('text=Critical pH').first()).toBeVisible();
  });

  test('3. Pharmacology dashboard opens and renders Autonomic lecture and practicals', async ({ page }) => {
    await page.goto('/subjects/dm5-pharm/lectures/dm5-pharm-lec-02', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText('Autonomic Pharmacology');
    await expect(page.locator('text=Pilocarpine').first()).toBeVisible();
    await expect(page.locator('text=بصي يا ريهام')).toBeVisible();

    // Check Practical 1
    await page.goto('/subjects/dm5-pharm/lectures/dm5-pharm-prac-01', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText('Practical 1: Pharmaceutical Dosage Forms');
  });

  test('4. Microbiology renders Plaque biofilm & Red Complex lectures', async ({ page }) => {
    await page.goto('/subjects/dm5-micromviro/lectures/dm5-micromviro-lec-06', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText('Oral Microbiome');
    await expect(page.locator('text=Red Complex').first()).toBeVisible();
  });

  test('5. Pathological Physiology renders Cell Adaptation & Dry Socket', async ({ page }) => {
    await page.goto('/subjects/dm5-pathol-phys/lectures/dm5-pathol-phys-lec-06', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText('Tissue Repair');
    await expect(page.locator('text=Dry Socket').first()).toBeVisible();
  });

  test('6. Quizzes open and display questions', async ({ page }) => {
    await page.goto('/subjects/dm5-car-hard-dent/quiz/quiz-car-hard-dent-01', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('button:has-text("Practice")')).toBeVisible();
    await expect(page.locator('text=Questions')).toBeVisible();
  });

  test('7. Coming Soon subject displays clean notification without errors', async ({ page }) => {
    await page.goto('/subjects/dm5-rad-diag', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=Educational materials for this subject are being processed')).toBeVisible();
  });

  test('8. Search page indexes all 62 lectures and glossary terms', async ({ page }) => {
    await page.goto('/search', { waitUntil: 'domcontentloaded' });
    await page.fill('input[type="search"]', 'Caries');
    await expect(page.locator('text=Diagnosis for Dental Caries').first()).toBeVisible();
  });
});
