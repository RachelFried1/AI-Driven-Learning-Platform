import React from 'react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login } from '@/features/auth/authSlice';

interface LoginButtonProps {
  email: string;
  password: string;
  onSuccess: (user: any) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ email, password, onSuccess }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const user = useAppSelector((state) => state.auth.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      onSuccess(resultAction.payload.user);
    }
    // Error is handled by Redux state
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginButton;