import React from 'react';
import { Button } from '@/components/ui/button';

interface LoginButtonProps {
  loading: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ loading }) => (
  <Button type="submit" className="w-full" disabled={loading}>
    {loading ? 'Signing In...' : 'Sign In'}
  </Button>
);

export default LoginButton;