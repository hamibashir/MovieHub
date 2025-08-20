// utils/helpers.ts - Utility Functions

/**
 * Format movie duration from minutes to human readable format
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} min`;
};

/**
 * Validate movie form data
 */
export const validateMovieForm = (data: {
  title: string;
  year: string;
  genre: string;
  rating: string;
  duration: string;
  downloadLink: string;
  description: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.title.trim()) {
    errors.push('Title is required');
  }
  
  const year = parseInt(data.year);
  if (!year || year < 1900 || year > new Date().getFullYear() + 5) {
    errors.push('Please enter a valid year');
  }
  
  if (!data.genre.trim()) {
    errors.push('Genre is required');
  }
  
  const rating = parseFloat(data.rating);
  if (isNaN(rating) || rating < 0 || rating > 10) {
    errors.push('Rating must be between 0 and 10');
  }
  
  if (!data.duration.trim()) {
    errors.push('Duration is required');
  }
  
  if (!data.downloadLink.trim()) {
    errors.push('Download link is required');
  } else {
    try {
      new URL(data.downloadLink);
    } catch {
      errors.push('Please enter a valid URL');
    }
  }
  
  if (!data.description.trim()) {
    errors.push('Description is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Debounce function for search input
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  waitFor: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

/**
 * Generate a random movie ID (for demo purposes)
 */
export const generateMovieId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

/**
 * Sort movies by different criteria
 */
export const sortMovies = (movies: any[], sortBy: 'title' | 'year' | 'rating' | 'genre', order: 'asc' | 'desc' = 'asc') => {
  return [...movies].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    // Handle string comparisons
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (order === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get movie poster placeholder URL based on genre
 */
export const getGenrePosterPlaceholder = (genre: string): string => {
  const genreColors: { [key: string]: string } = {
    'Action': '#ff6b35',
    'Comedy': '#f7931e',
    'Drama': '#2e7d32',
    'Horror': '#8e24aa',
    'Sci-Fi': '#1976d2',
    'Romance': '#e91e63',
    'Thriller': '#424242',
    'Default': '#607d8b'
  };
  
  const color = genreColors[genre] || genreColors.Default;
  return `https://via.placeholder.com/300x450/${color.substring(1)}/ffffff?text=${encodeURIComponent(genre)}`;
};