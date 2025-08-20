// pages/NotFoundPage.tsx - 404 Error Page
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Film } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="mb-8">
          <Film size={120} className="text-gray-600 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-500 mb-2">404</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, 
          or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-colors duration-200"
          >
            <Home size={20} className="mr-2" />
            Go to Home
          </button>
          
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white font-semibold transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
          <p className="text-gray-400 text-sm">
            If you believe this is an error, please check the URL or return to the home page 
            to browse our movie collection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;