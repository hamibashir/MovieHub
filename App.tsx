// App.tsx - Main Application Component (Refactored)
import React, { useState, useCallback, useMemo } from 'react';
import { Movie, MovieFormState } from './types';
import { useMovies } from './hooks/useMovies';

// Component imports
import Header from './components/Header';
import SearchControls from './components/SearchControls';
import MovieGrid from './components/MovieGrid';
import MovieFormModal from './components/MovieFormModal';
import VideoPlayerModal from './components/VideoPlayerModal';

const App: React.FC = () => {
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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
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
      // You could show a toast notification here
    }
  }, [editingMovie, addMovie, updateMovie]);

  const handleDeleteMovie = useCallback(async (movieId: number) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(movieId);
      } catch (error) {
        console.error("Error deleting movie:", error);
        // You could show a toast notification here
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
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
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
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-900 text-white font-sans p-6 md:p-12">
      {/* Header */}
      <Header
        isAdmin={isAdmin}
        onAdminToggle={setIsAdmin}
      />

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
    </div>
  );
};

export default App;