import { test, expect } from '@playwright/test';
import { FilmStorePage } from '../../pages/film_store.page';

test.describe('Films List', () => {
  test('should display a list of films with title, release year, director, and rating', async ({
    page,
  }) => {
    const filmStorePage = new FilmStorePage(page);
    await filmStorePage.goto();
    const filmItems = await filmStorePage.getFilmRows();

    expect(filmItems.length, 'Expected more than one film in the list').toBeGreaterThan(0);

    for (let i = 0; i < filmItems.length; i++) {
      const film = filmItems[i];
      //expect soft so we don't stop on the first error - change the default timeout since we know the page should have loaded
      await expect
        .soft(film.title, 'Expected title to not be blank on row ' + (i + 1))
        .toHaveText(/.+/, { timeout: 500 });
      await expect
        .soft(film.year, 'Expected year to be a 4-digit number on row ' + (i + 1))
        .toHaveText(/^\d{4}$/, { timeout: 500 });
      await expect
        .soft(film.director, 'Expected director name to not be blank on row ' + (i + 1))
        .toHaveText(/.+/, { timeout: 500 });
      await expect
        .soft(
          film.rating,
          'Expected rating to be a number between 0 and 10 in the format "X / 10" on row ' + (i + 1)
        )
        .toHaveText(/^([0-9](\.\d)?|10) \/ 10$/, { timeout: 500 });
    }
  });
});
