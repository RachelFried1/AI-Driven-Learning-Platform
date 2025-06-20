import React from 'react';
import { useAppSelector } from '@/app/hooks';

const RegisterError: React.FC = () => {
  const error = useAppSelector((state) => state.auth.error);

  if (!error) return null;

  return (
    <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-2">
      {error}
    </div>
  );
};

export default RegisterError;