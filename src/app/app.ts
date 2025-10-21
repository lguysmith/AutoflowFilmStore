import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import IFilm from './models/IFilm'
import defaultFilms from './data/films'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  formFailedSubmit = false;

  filmForm = new FormGroup({
    title: new FormControl('', Validators.required),
    releaseYear: new FormControl(''),
    director: new FormControl(''),
    rating: new FormControl(''),  
  });

  get titleFormControl() {
    return this.filmForm.get('title');
  }

  get releaseYearFormControl() {
    return this.filmForm.get('releaseYear');
  }

  get directorFormControl() {
    return this.filmForm.get('director');
  }

  get ratingFormControl() {
    return this.filmForm.get('rating');
  }

  films = signal<IFilm[]>(defaultFilms);

  addFilm() {

    if(this.titleFormControl?.invalid || this.releaseYearFormControl?.invalid || this.directorFormControl?.invalid || this.ratingFormControl?.invalid) {
      this.formFailedSubmit = true;
      return;
    };

    const newFilm: IFilm = {
      id: this.generateFilmId(),
      title: this.filmForm.value.title || '',
      releaseYear: Number(this.filmForm.value.releaseYear),
      director: this.filmForm.value.director || '',
      ratingOutOfTen: 0
    };

    this.films.update(films => [...films, newFilm]);

    this.filmForm.reset();

    this.formFailedSubmit = false;
  }

  generateFilmId() {
    const currentIds = this.films().map(e => e.id);
    return Math.max(...currentIds) + 1;
  }
}
