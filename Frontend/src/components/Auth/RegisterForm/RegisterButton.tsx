import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { register as registerThunk } from '@/features/auth/authSlice';
import { RegisterData } from '../../../types';

interface RegisterButtonProps {
  formData: RegisterData;
  validate: () => string | null;
  onSuccess: () => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ formData, validate, onSuccess }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const validationError = validate();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    const resultAction = await dispatch(registerThunk(formData));
    if (registerThunk.fulfilled.match(resultAction)) {
      onSuccess();
    }
    // Error is handled by Redux state
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {localError && (
        <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-2">
          {localError}
        </div>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterButton;