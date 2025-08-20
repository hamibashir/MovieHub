// components/VideoPlayerModal.tsx
import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Movie } from '../types';

interface VideoPlayerModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ movie, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (movie) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [movie, onClose]);

  if (!movie) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 flex flex-col justify-center items-center z-50 p-4"
      onClick={(e) => {
        // Close modal when clicking outside the video
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-gray-900 rounded-xl shadow-2xl relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-400 transition-colors z-50 bg-black bg-opacity-50 rounded-full p-2"
          title="Close Player"
        >
          <X size={24} />
        </button>
        <div className="relative pt-[56.25%] overflow-hidden rounded-xl">
          <video
            ref={videoRef}
            src={movie.downloadLink}
            controls
            autoPlay
            className="absolute top-0 left-0 w-full h-full object-contain"
            onError={(e) => {
              console.error('Video failed to load:', e);
              // You could show an error message to the user here
            }}
          >
            <p className="text-white p-4">
              Your browser does not support the video tag.
            </p>
          </video>
        </div>
        <div className="p-4 bg-gray-900 rounded-b-xl">
          <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>{movie.year}</span>
            <span>{movie.genre}</span>
            <span>⭐ {movie.rating}</span>
            <span>{movie.duration}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VideoPlayerModal;