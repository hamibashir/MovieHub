// components/MovieFormModal.tsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Movie, MovieFormState } from '../types';

interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (movie: MovieFormState) => void;
  editingMovie: Movie | null;
}

const MovieFormModal: React.FC<MovieFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingMovie
}) => {
  const [formData, setFormData] = useState<MovieFormState>({
    title: '',
    year: '',
    genre: '',
    rating: '',
    duration: '',
    downloadLink: '',
    description: ''
  });

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title,
        year: editingMovie.year.toString(),
        genre: editingMovie.genre,
        rating: editingMovie.rating.toString(),
        duration: editingMovie.duration,
        downloadLink: editingMovie.downloadLink,
        description: editingMovie.description,
      });
    } else {
      setFormData({
        title: '',
        year: '',
        genre: '',
        rating: '',
        duration: '',
        downloadLink: '',
        description: ''
      });
    }
  }, [editingMovie, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  const formFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { name: 'genre', label: 'Genre', type: 'text', required: true },
    { name: 'rating', label: 'Rating', type: 'number', required: true, step: '0.1', min: '0', max: '10' },
    { name: 'duration', label: 'Duration', type: 'text', required: true, placeholder: 'e.g., 148 min' },
    { name: 'downloadLink', label: 'Download Link', type: 'url', required: true },
  ];

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-8 max-w-lg w-full shadow-2xl relative border border-gray-700 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          type="button"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {editingMovie ? 'Edit Movie' : 'Add New Movie'}
        </h2>
        <div onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map(field => (
              <div key={field.name} className="flex flex-col">
                <label htmlFor={field.name} className="text-sm font-medium text-gray-400 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name as keyof MovieFormState]}
                  onChange={handleChange}
                  required={field.required}
                  step={field.step}
                  min={field.min}
                  max={field.max}
                  placeholder={field.placeholder}
                  className="bg-gray-800 text-white rounded-md p-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
            ))}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="bg-gray-800 text-white rounded-md p-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className="w-full mt-6 px-6 py-3 bg-blue-600 rounded-full text-white font-bold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {editingMovie ? 'Save Changes' : 'Add Movie'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MovieFormModal;