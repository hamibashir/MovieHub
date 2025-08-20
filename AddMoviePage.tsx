// pages/AddMoviePage.tsx - Add New Movie Page
import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MovieFormState } from '../types';
import { useMovies } from '../hooks/useMovies';
import MovieFormModal from '../components/MovieFormModal';

interface OutletContext {
  isAdmin: boolean;
}

const AddMoviePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useOutletContext<OutletContext>();
  const { addMovie } = useMovies();

  useEffect(() => {
    // Redirect non-admin users
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleSubmit = async (movieData: MovieFormState) => {
    try {
      await addMovie(movieData);
      navigate('/');
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  if (!isAdmin) {
    return null; // This will redirect in useEffect
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
          Back to Movies
        </button>

        {/* Add Form Header */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-6">Add New Movie</h1>
          <p className="text-gray-400 mb-8">
            Fill in the details below to add a new movie to your collection. All fields are required.
          </p>
          
          {/* Inline Add Form */}
          <MovieFormModal
            isOpen={true}
            onClose={handleClose}
            onSubmit={handleSubmit}
            editingMovie={null}
          />
        </div>
      </div>
    </>
  );
};

export default AddMoviePage;