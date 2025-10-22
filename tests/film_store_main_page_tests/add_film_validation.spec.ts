import { test, expect } from '@playwright/test';
import { FilmStorePage } from '../../pages/film_store.page';

test.describe('Form Validation', () => {
  test('should show errors when required fields are missing and should not add the film', async ({
    page,
  }) => {
    const filmStore = new FilmStorePage(page);
    await filmStore.goto();

    const initialRows = await filmStore.getFilmRows();
    const initialCount = initialRows.length;

    await filmStore.addFilmButton.click();

    await expect(filmStore.titleError).toHaveText('please enter a title');
    //These have not been added in the page
    await expect(filmStore.yearError).toHaveText('please enter a year');
    await expect(filmStore.directorError).toHaveText('please enter a director');
    await expect(filmStore.ratingError).toHaveText('please enter a rating');

    const updatedRows = await filmStore.getFilmRows();
    expect(updatedRows.length).toBe(initialCount); // no film added
  });

  test('should show error for invalid year format', async ({ page }) => {
    const filmStore = new FilmStorePage(page);
    await page.goto(filmStore.url);

    const initialRows = await filmStore.getFilmRows();
    const initialCount = initialRows.length;

    await filmStore.titleInput.fill('Test Film');
    await filmStore.yearInput.fill('abcd'); // invalid year
    await filmStore.directorInput.fill('Test Director');
    await filmStore.ratingInput.fill('7.5');

    await filmStore.addFilmButton.click();
    //This error has not been added in the page
    await expect(filmStore.yearError).toHaveText(/please enter a 4-digit year/i);

    const updatedRows = await filmStore.getFilmRows();
    expect(updatedRows.length).toBe(initialCount); // no film added
  });

  test('should show error for rating outside allowed range', async ({ page }) => {
    const filmStore = new FilmStorePage(page);
    await page.goto(filmStore.url);

    const initialRows = await filmStore.getFilmRows();
    const initialCount = initialRows.length;

    await filmStore.titleInput.fill('Test Film');
    await filmStore.yearInput.fill('2000');
    await filmStore.directorInput.fill('Test Director');
    await filmStore.ratingInput.fill('11'); // invalid rating

    await filmStore.addFilmButton.click();
    //This error has not been added in the page
    await expect(filmStore.ratingError).toHaveText('please enter a rating between 1 and 10');

    const updatedRows = await filmStore.getFilmRows();
    expect(updatedRows.length).toBe(initialCount); // no film added
  });
});
