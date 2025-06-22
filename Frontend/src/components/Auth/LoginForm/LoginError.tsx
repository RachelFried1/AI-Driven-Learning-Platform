import React from 'react';
import { useAppSelector } from '@/app/hooks';

interface LoginErrorProps {
  onSwitchToRegister?: () => void;
}

const LoginError: React.FC<LoginErrorProps> = ({ onSwitchToRegister }) => {
  const error = useAppSelector((state) => state.auth.error);

  if (!error) return null;

  const showCreateLink =
    error === "Invalid email or password." ||
    error === "Invalid credentials" ||
    error === "Unauthorized" ||
    error === "401" ||
    (typeof error === "string" &&
      (error.toLowerCase().includes("invalid") ||
        error.toLowerCase().includes("unauthorized")));


  return (
    <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-4">
      {error} <br />
      {showCreateLink && (
        <>
          Don't have an account?{' '}
          <button
            type="button"
            className="text-blue-600 cursor-pointer underline bg-transparent border-none p-0 m-0"
            onClick={onSwitchToRegister}
          >
            Create one
          </button>
        </>
      )}
    </div>
  );
};

export default LoginError;