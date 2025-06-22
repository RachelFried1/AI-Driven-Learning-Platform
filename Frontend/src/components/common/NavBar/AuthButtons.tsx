import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthButtons: React.FC = () => (
  <div className="flex items-center space-x-3">
    <Link to="/login">
      <Button variant="ghost">Login</Button>
    </Link>
    <Link to="/register">
      <Button>Sign Up</Button>
    </Link>
  </div>
);

export default AuthButtons;