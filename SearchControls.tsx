// components/SearchControls.tsx - Updated with Navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';

interface SearchControlsProps {
  searchTerm: string;
  selectedGenre: string;
  allGenres: string[];
  isAdmin: boolean;
  onSearchChange: (searchTerm: string) => void;
  onGenreChange: (genre: string) => void;
  onAddNewMovie?: () => void; // Made optional since we're using navigation
}

const SearchControls: React.FC<SearchControlsProps> = ({
  searchTerm,
  selectedGenre,
  allGenres,
  isAdmin,
  onSearchChange,
  onGenreChange,
}) => {
  const navigate = useNavigate();

  const handleAddNewMovie = () => {
    navigate('/add');
  };

  return (
    <section className="mb-8 bg-gray-800 p-6 rounded-xl shadow-inner border border-gray-700">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {allGenres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          {isAdmin && (
            <button
              onClick={handleAddNewMovie}
              className="w-full md:w-auto flex items-center justify-center px-6 py-2 bg-blue-600 rounded-full text-white font-bold hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              <Plus size={20} className="mr-2" /> Add New Movie
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchControls;