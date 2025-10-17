import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import IFilm from './models/IFilm'
import defaultFilms from './data/films'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  filmForm = new FormGroup({
    title: new FormControl(''),
    releaseYear: new FormControl(''),
    director: new FormControl(''),
    rating: new FormControl(''),  
  });

  films = signal<IFilm[]>(defaultFilms);

  addFilm() {
    const newFilm: IFilm = {
      id: this.generateFilmId(),
      title: this.filmForm.value.title || '',
      releaseYear: Number(this.filmForm.value.releaseYear),
      director: this.filmForm.value.director || '',
      ratingOutOfTen: 0
    };

    this.films.update(films => [...films, newFilm]);

    this.resetForm();
  }

  generateFilmId() {
    const currentIds = this.films().map(e => e.id);
    return Math.max(...currentIds) + 1;
  }

  resetForm() {
    this.filmForm.setValue(    {
      title: '',
      releaseYear: '',
      director: '',
      rating: '5'  
    },);
  }
}
