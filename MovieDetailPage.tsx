// pages/MovieDetailPage.tsx - Individual Movie Detail Page
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft, Play, Star, Calendar, Clock, Film, Edit2, Trash2, Download } from 'lucide-react';
import { Movie } from '../types';
import { useMovies } from '../hooks/useMovies';
import VideoPlayerModal from '../components/VideoPlayerModal';

interface OutletContext {
  isAdmin: boolean;
}

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useOutletContext<OutletContext>();
  const { movies, loading, deleteMovie } = useMovies();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedMovieForPlayback, setSelectedMovieForPlayback] = useState<Movie | null>(null);

  useEffect(() => {
    if (id && movies.length > 0) {
      const foundMovie = movies.find(m => m.id === parseInt(id));
      setMovie(foundMovie || null);
    }
  }, [id, movies]);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleWatchMovie = () => {
    if (movie) {
      setSelectedMovieForPlayback(movie);
    }
  };

  const handleEditMovie = () => {
    if (movie) {
      navigate(`/edit/${movie.id}`);
    }
  };

  const handleDeleteMovie = async () => {
    if (movie && window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(movie.id);
        navigate('/');
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  const handleClosePlayer = () => {
    setSelectedMovieForPlayback(null);
  };

  const handleDownload = () => {
    if (movie) {
      window.open(movie.downloadLink, '_blank');
    }
  };

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
          <p className="text-gray-400 mb-6">The movie you're looking for doesn't exist.</p>
          <button
            onClick={handleGoBack}
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
          Back to Movies
        </button>

        {/* Movie Detail Card */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Movie Poster Placeholder */}
            <div className="lg:w-1/3">
              <div className="aspect-[2/3] bg-gray-700 rounded-lg flex items-center justify-center">
                <Film size={64} className="text-gray-500" />
              </div>
            </div>

            {/* Movie Information */}
            <div className="lg:w-2/3 space-y-6">
              {/* Title and Year */}
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
                <div className="flex items-center gap-6 text-gray-400">
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center">
                    <Film size={18} className="mr-2" />
                    <span>{movie.genre}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={18} className="text-yellow-400 mr-2" />
                    <span>{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2" />
                    <span>{movie.duration}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">{movie.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={handleWatchMovie}
                  className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold transition-colors duration-200"
                >
                  <Play size={20} className="mr-2" />
                  Watch Now
                </button>
                
                <button
                  onClick={handleDownload}
                  className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-colors duration-200"
                >
                  <Download size={20} className="mr-2" />
                  Download
                </button>

                {isAdmin && (
                  <>
                    <button
                      onClick={handleEditMovie}
                      className="flex items-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-full text-white font-semibold transition-colors duration-200"
                    >
                      <Edit2 size={20} className="mr-2" />
                      Edit
                    </button>
                    
                    <button
                      onClick={handleDeleteMovie}
                      className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold transition-colors duration-200"
                    >
                      <Trash2 size={20} className="mr-2" />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        movie={selectedMovieForPlayback}
        onClose={handleClosePlayer}
      />
    </>
  );
};

export default MovieDetailPage;