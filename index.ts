// constants/index.ts - Application Constants

/**
 * Movie genres available in the application
 */
export const MOVIE_GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western'
] as const;

/**
 * API endpoints (for future backend integration)
 */
export const API_ENDPOINTS = {
  MOVIES: '/api/movies',
  MOVIE_BY_ID: (id: number) => `/api/movies/${id}`,
  UPLOAD: '/api/upload',
  SEARCH: '/api/search'
} as const;

/**
 * Application configuration
 */
export const APP_CONFIG = {
  APP_NAME: 'Movie Hub',
  APP_VERSION: '1.0.0',
  ITEMS_PER_PAGE: 20,
  MAX_FILE_SIZE: 5 * 1024 * 1024 * 1024, // 5GB in bytes
  SUPPORTED_VIDEO_FORMATS: ['mp4', 'mkv', 'avi', 'mov', 'wmv'],
  DEBOUNCE_DELAY: 300, // milliseconds
  TOAST_DURATION: 3000 // milliseconds
} as const;

/**
 * UI Constants
 */
export const UI_CONSTANTS = {
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536
  },
  GRID_COLUMNS: {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3,
    LARGE: 4
  },
  ANIMATION_DURATION: 300
} as const;

/**
 * Default values for forms
 */
export const FORM_DEFAULTS = {
  MOVIE: {
    title: '',
    year: new Date().getFullYear().toString(),
    genre: 'Drama',
    rating: '7.0',
    duration: '120 min',
    downloadLink: '',
    description: ''
  }
} as const;

/**
 * Validation rules
 */
export const VALIDATION_RULES = {
  TITLE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100
  },
  YEAR: {
    MIN: 1900,
    MAX: new Date().getFullYear() + 5
  },
  RATING: {
    MIN: 0,
    MAX: 10,
    DECIMAL_PLACES: 1
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000
  }
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size is too large. Please choose a smaller file.',
  UNSUPPORTED_FORMAT: 'Unsupported file format.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_URL: 'Please enter a valid URL.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_YEAR: 'Please enter a valid year.',
  INVALID_RATING: 'Rating must be between 0 and 10.'
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  MOVIE_ADDED: 'Movie added successfully!',
  MOVIE_UPDATED: 'Movie updated successfully!',
  MOVIE_DELETED: 'Movie deleted successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!'
} as const;

/**
 * Loading states
 */
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  ADMIN_MODE: 'moviehub_admin_mode',
  PREFERENCES: 'moviehub_preferences',
  RECENT_SEARCHES: 'moviehub_recent_searches'
} as const;