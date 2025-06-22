import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const NavbarBrand: React.FC = () => (
  <Link to="/" className="flex items-center space-x-2">
    <BookOpen className="h-8 w-8 text-blue-600" />
    <span className="text-xl font-bold text-gray-900">AI Learn</span>
  </Link>
);

export default NavbarBrand;