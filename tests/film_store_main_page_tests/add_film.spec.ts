import { test, expect } from '@playwright/test';
import { FilmStorePage } from '../../pages/film_store.page';

test.describe('Add Film', () => {
  test('should display Add New Film section with required fields and button', async ({ page }) => {
    const filmStore = new FilmStorePage(page);
    await filmStore.goto();

    await expect(filmStore.addFilmSection).toBeVisible();
    await expect(filmStore.titleInput).toBeVisible();
    await expect(filmStore.yearInput).toBeVisible();
    await expect(filmStore.directorInput).toBeVisible();
    await expect(filmStore.ratingInput).toBeVisible();
    await expect(filmStore.addFilmButton).toBeVisible();
    // Check that the Add Film button width is less than the viewport width
    const buttonBox = await filmStore.addFilmButton.boundingBox();
    const viewportSize = page.viewportSize();

    expect(buttonBox).not.toBeNull();
    expect(
      buttonBox!.x + buttonBox!.width,
      'Expect Add Film button width to be less than viewport width'
    ).toBeLessThanOrEqual(viewportSize!.width);
  });

  test('should add a new film and display it at the bottom of the list', async ({ page }) => {
    const filmStore = new FilmStorePage(page);
    await page.goto(filmStore.url);

    // Constants for test data
    const newTitle = 'Inception';
    const newYear = '2010';
    const newDirector = 'Christopher Nolan';
    const newRating = '8.8';
    const newRatingDisplay = `${newRating} / 10`;

    const initialRows = await filmStore.getFilmRows();
    const initialCount = initialRows.length;

    // Fill in the form
    await filmStore.titleInput.fill(newTitle);
    await filmStore.yearInput.fill(newYear);
    await filmStore.directorInput.fill(newDirector);
    await filmStore.ratingInput.fill(newRating);

    // Submit the form
    await filmStore.addFilmButton.click();

    // Assert form is cleared
    await expect(filmStore.titleInput).toHaveValue('');
    await expect(filmStore.yearInput).toHaveValue('');
    await expect(filmStore.directorInput).toHaveValue('');
    await expect(filmStore.ratingInput).toHaveValue('');

    // Assert new film appears at the bottom of the list
    const updatedRows = await filmStore.getFilmRows();
    expect(updatedRows.length).toBe(initialCount + 1);

    const lastFilm = updatedRows[updatedRows.length - 1];
    await expect(lastFilm.title).toHaveText(newTitle);
    await expect(lastFilm.year).toHaveText(newYear);
    await expect(lastFilm.director).toHaveText(newDirector);
    await expect(lastFilm.rating).toHaveText(newRatingDisplay);
  });
});
