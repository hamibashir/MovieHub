// pages/HomePage.tsx - Main Home Page
import React, { useState, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Movie, MovieFormState } from '../types';
import { useMovies } from '../hooks/useMovies';

// Component imports
import SearchControls from '../components/SearchControls';
import MovieGrid from '../components/MovieGrid';
import MovieFormModal from '../components/MovieFormModal';
import VideoPlayerModal from '../components/VideoPlayerModal';

interface OutletContext {
  isAdmin: boolean;
}

const HomePage: React.FC = () => {
  const { isAdmin } = useOutletContext<OutletContext>();
  
  // Custom hook for movie management
  const { 
    movies, 
    loading, 
    error, 
    addMovie, 
    updateMovie, 
    deleteMovie, 
    allGenres, 
    getFilteredMovies,
    clearError 
  } = useMovies();

  // Local UI state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [selectedMovieForPlayback, setSelectedMovieForPlayback] = useState<Movie | null>(null);

  // Memoized filtered movies
  const filteredMovies = useMemo(() => 
    getFilteredMovies(searchTerm, selectedGenre),
    [getFilteredMovies, searchTerm, selectedGenre]
  );

  // Event handlers
  const handleAddEditMovie = useCallback(async (movieData: MovieFormState) => {
    try {
      if (editingMovie) {
        await updateMovie(editingMovie.id, movieData);
      } else {
        await addMovie(movieData);
      }
      setEditingMovie(null);
      setShowFormModal(false);
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  }, [editingMovie, addMovie, updateMovie]);

  const handleDeleteMovie = useCallback(async (movieId: number) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(movieId);
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  }, [deleteMovie]);

  const handleEditMovie = useCallback((movie: Movie) => {
    setEditingMovie(movie);
    setShowFormModal(true);
  }, []);

  const handleWatchMovie = useCallback((movie: Movie) => {
    setSelectedMovieForPlayback(movie);
  }, []);

  const handleClosePlayer = useCallback(() => {
    setSelectedMovieForPlayback(null);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowFormModal(false);
    setEditingMovie(null);
  }, []);

  const handleAddNewMovie = useCallback(() => {
    setEditingMovie(null);
    setShowFormModal(true);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading movies...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={clearError}
            className="px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Search Controls */}
      <SearchControls
        searchTerm={searchTerm}
        selectedGenre={selectedGenre}
        allGenres={allGenres}
        isAdmin={isAdmin}
        onSearchChange={setSearchTerm}
        onGenreChange={setSelectedGenre}
        onAddNewMovie={handleAddNewMovie}
      />

      {/* Movie Grid */}
      <MovieGrid
        movies={filteredMovies}
        isAdmin={isAdmin}
        onWatch={handleWatchMovie}
        onEdit={handleEditMovie}
        onDelete={handleDeleteMovie}
      />

      {/* Add/Edit Movie Modal */}
      <MovieFormModal
        isOpen={showFormModal}
        onClose={handleCloseForm}
        onSubmit={handleAddEditMovie}
        editingMovie={editingMovie}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        movie={selectedMovieForPlayback}
        onClose={handleClosePlayer}
      />
    </>
  );
};

export default HomePage;