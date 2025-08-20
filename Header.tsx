// components/Header.tsx
import React from 'react';
import { Globe } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onAdminToggle: (isAdmin: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, onAdminToggle }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-12">
      <div className="flex items-center mb-4 md:mb-0">
        <Globe size={48} className="text-blue-500 mr-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Movie <span className="text-blue-500">Hub</span>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center cursor-pointer">
          <span className="text-gray-400 mr-2">Admin Mode</span>
          <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isAdmin ? 'bg-green-500' : 'bg-gray-600'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isAdmin ? 'translate-x-6' : 'translate-x-0'}`} />
          </div>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={isAdmin} 
            onChange={(e) => onAdminToggle(e.target.checked)} 
          />
        </label>
      </div>
    </header>
  );
};

export default Header;