// services/movieApiService.ts
import { Movie, MovieFormState } from '../types';
import { initialMovies } from '../data/initialMovies';

/**
 * Movie API Service - Simulates backend API calls
 * In a real application, these would be actual HTTP requests
 */
export class MovieApiService {
  // Simulated database
  private static movieDatabase: Movie[] = [...initialMovies];

  /**
   * Fetch all movies from the "database"
   */
  static async fetchMovies(): Promise<Movie[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.movieDatabase]);
      }, 500);
    });
  }

  /**
   * Add a new movie to the "database"
   */
  static async addMovie(movie: MovieFormState): Promise<Movie> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMovie: Movie = {
          id: Date.now(),
          ...movie,
          year: parseInt(movie.year),
          rating: parseFloat(movie.rating)
        };
        this.movieDatabase.push(newMovie);
        resolve(newMovie);
      }, 300);
    });
  }

  /**
   * Update an existing movie in the "database"
   */
  static async updateMovie(movieId: number, movieData: MovieFormState): Promise<Movie> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const movieIndex = this.movieDatabase.findIndex(m => m.id === movieId);
        if (movieIndex === -1) {
          reject(new Error('Movie not found'));
          return;
        }

        const updatedMovie: Movie = {
          ...this.movieDatabase[movieIndex],
          ...movieData,
          year: parseInt(movieData.year),
          rating: parseFloat(movieData.rating)
        };
        
        this.movieDatabase[movieIndex] = updatedMovie;
        resolve(updatedMovie);
      }, 300);
    });
  }

  /**
   * Delete a movie from the "database"
   */
  static async deleteMovie(movieId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const movieIndex = this.movieDatabase.findIndex(m => m.id === movieId);
        if (movieIndex === -1) {
          reject(new Error('Movie not found'));
          return;
        }
        
        this.movieDatabase.splice(movieIndex, 1);
        resolve();
      }, 300);
    });
  }
}