// components/MovieGrid.tsx
import React from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  isAdmin: boolean;
  onWatch: (movie: Movie) => void;
  onEdit: (movie: Movie) => void;
  onDelete: (movieId: number) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  isAdmin,
  onWatch,
  onEdit,
  onDelete
}) => {
  if (movies.length === 0) {
    return (
      <section>
        <div className="text-center text-gray-500 text-lg">
          No movies found. Try a different search or genre.
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isAdmin={isAdmin}
            onWatch={onWatch}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;