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

  get addFilmSection(): Locator {
    return this.page.getByRole('heading', { name: 'Add Film' });
  }

  get titleInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Title:' });
  }

  get yearInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Release Year' });
  }

  get directorInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Director' });
  }

  get ratingInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Rating (X out of 10)' });
  }

  get addFilmButton(): Locator {
    return this.page.getByRole('button', { name: 'Ad Film' }); // Note: 'Ad Film' button has a typo in the name
  }
  //there is currently only an error for the title field. The others should be added by the developer
  get titleError(): Locator {
    return this.page.getByText('please enter a title');
  }

  get yearError(): Locator {
    return this.page.locator('#year-error');
  }

  get directorError(): Locator {
    return this.page.locator('#director-error');
  }

  get ratingError(): Locator {
    return this.page.locator('#rating-error');
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
