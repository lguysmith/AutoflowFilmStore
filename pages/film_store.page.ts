import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
/**
 * FilmStorePage represents the main page of the Film Store application.
 * It extends the BasePage class to inherit common page functionalities.
 */
export class FilmStorePage extends BasePage {
  readonly url = '/';
  constructor(page: Page) {
    super(page);
  }
  get tableBody(): Locator {
    return this.page.locator('tbody');
  }

  async getFilmRows(): Promise<FilmRow[]> {
    const rows = this.tableBody.locator('tr');
    const count = await rows.count();
    const films: FilmRow[] = [];

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const title = row.locator('th');
      const year = row.locator('td').nth(0);
      const director = row.locator('td').nth(1);
      const rating = row.locator('td').nth(2);

      films.push({
        title: title,
        year: year,
        director: director,
        rating,
      });
    }

    return films;
  }
}

export interface FilmRow {
  title: Locator;
  year: Locator;
  director: Locator;
  rating: Locator;
}
