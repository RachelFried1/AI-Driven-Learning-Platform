import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { logout } from '@/features/auth/authSlice';
import NavbarBrand from './NavbarBrand';
import NavbarLinks from './NavbarLinks';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavbarBrand />
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NavbarLinks role={user?.role} />
                <UserMenu userName={user?.name} onLogout={handleLogout} />
              </>
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;