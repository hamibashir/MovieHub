// hooks/useMovies.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Movie, MovieFormState } from '../types';
import { MovieApiService } from '../services/movieApiService';
import { initialMovies } from '../data/initialMovies';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial movies
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const movieData = await MovieApiService.fetchMovies();
        setMovies(movieData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Add a new movie
  const addMovie = useCallback(async (movieData: MovieFormState): Promise<void> => {
    try {
      const newMovie = await MovieApiService.addMovie(movieData);
      setMovies(prev => [...prev, newMovie]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add movie');
      throw err;
    }
  }, []);

  // Update an existing movie
  const updateMovie = useCallback(async (movieId: number, movieData: MovieFormState): Promise<void> => {
    try {
      const updatedMovie = await MovieApiService.updateMovie(movieId, movieData);
      setMovies(prev => prev.map(m => m.id === movieId ? updatedMovie : m));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update movie');
      throw err;
    }
  }, []);

  // Delete a movie
  const deleteMovie = useCallback(async (movieId: number): Promise<void> => {
    try {
      await MovieApiService.deleteMovie(movieId);
      setMovies(prev => prev.filter(m => m.id !== movieId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete movie');
      throw err;
    }
  }, []);

  // Get all unique genres
  const allGenres = useMemo(() => {
    const genres = Array.from(new Set(initialMovies.map(movie => movie.genre)));
    return ['All', ...genres.sort()];
  }, []);

  // Filter movies based on search term and genre
  const getFilteredMovies = useCallback((searchTerm: string, selectedGenre: string): Movie[] => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [movies]);

  return {
    movies,
    loading,
    error,
    addMovie,
    updateMovie,
    deleteMovie,
    allGenres,
    getFilteredMovies,
    clearError: () => setError(null)
  };
};