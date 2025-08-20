// components/MovieCard.tsx - Updated with Navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star, Calendar, Clock, Film, Edit2, Trash2, Eye } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  isAdmin: boolean;
  onWatch: (movie: Movie) => void;
  onEdit: (movie: Movie) => void;
  onDelete: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  isAdmin, 
  onWatch, 
  onDelete 
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/edit/${movie.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onDelete(movie.id);
  };

  const handleWatch = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onWatch(movie);
  };

  return (
    <div 
      className="bg-gray-800 rounded-lg p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between cursor-pointer group"
      onClick={handleViewDetails}
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{movie.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <Film size={16} className="text-gray-500 mr-2" />
            <span>{movie.genre}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 mr-2" />
            <span>{movie.rating}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="text-gray-500 mr-2" />
            <span>{movie.duration}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center gap-2 mt-4">
        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white text-sm font-medium transition-colors duration-200"
          title="View Details"
        >
          <Eye size={16} className="mr-1" />
          Details
        </button>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <button
                onClick={handleEdit}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                title="Edit Movie"
              >
                <Edit2 size={16} className="text-white" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
                title="Delete Movie"
              >
                <Trash2 size={16} className="text-white" />
              </button>
            </>
          )}
          <button
            onClick={handleWatch}
            className="p-2 rounded-full bg-green-600 hover:bg-green-700 transition-colors duration-200"
            title="Watch Now"
          >
            <Play size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;