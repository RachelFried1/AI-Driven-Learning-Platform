import React from 'react';
import { useAppSelector } from '@/app/hooks';

interface LoginErrorProps {
  onSwitchToRegister?: () => void;
}

const LoginError: React.FC<LoginErrorProps> = ({ onSwitchToRegister }) => {
  const error = useAppSelector((state) => state.auth.error);

  if (!error) return null;

  return (
    <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-4">
      {error} <br />
      {error === "Invalid email or password." && (
        <>
          Don&apos;t have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={onSwitchToRegister}
          >
            Create one
          </span>
        </>
      )}
    </div>
  );
};

export default LoginError;