// pages/EditMoviePage.tsx - Edit Movie Page
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Movie, MovieFormState } from '../types';
import { useMovies } from '../hooks/useMovies';
import MovieFormModal from '../components/MovieFormModal';

interface OutletContext {
  isAdmin: boolean;
}

const EditMoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useOutletContext<OutletContext>();
  const { movies, loading, updateMovie } = useMovies();
  
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    // Redirect non-admin users
    if (!isAdmin) {
      navigate('/');
      return;
    }

    if (id && movies.length > 0) {
      const foundMovie = movies.find(m => m.id === parseInt(id));
      setMovie(foundMovie || null);
    }
  }, [id, movies, isAdmin, navigate]);

  const handleGoBack = () => {
    navigate(`/movie/${id}`);
  };

  const handleSubmit = async (movieData: MovieFormState) => {
    if (movie) {
      try {
        await updateMovie(movie.id, movieData);
        navigate(`/movie/${movie.id}`);
      } catch (error) {
        console.error("Error updating movie:", error);
      }
    }
  };

  const handleClose = () => {
    navigate(`/movie/${id}`);
  };

  if (!isAdmin) {
    return null; // This will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading movie...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Movie Not Found</h2>
          <p className="text-gray-400 mb-6">The movie you're trying to edit doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          >
            Go Back to Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Movie Details
        </button>

        {/* Edit Form Header */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-6">Edit Movie: {movie.title}</h1>
          <p className="text-gray-400 mb-8">
            Update the movie information below. All fields are required.
          </p>
          
          {/* Inline Edit Form */}
          <MovieFormModal
            isOpen={true}
            onClose={handleClose}
            onSubmit={handleSubmit}
            editingMovie={movie}
          />
        </div>
      </div>
    </>
  );
};

export default EditMoviePage;