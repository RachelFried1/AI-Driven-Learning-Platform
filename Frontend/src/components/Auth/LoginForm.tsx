import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../../hooks/useAuth';
import { LoginCredentials } from '../../types';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { user } = await login(credentials); // login returns user info
      if (onSuccess) {
        onSuccess();
      } else {
        if (user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/lessons');
        }
      }
    } catch (error: any) {
      // Improved error handling:
      if (error?.response) {
        if (error.response.status === 401 || error.response.status === 400) {
          setError("Invalid email or password.");
        } else {
          setError("Login failed. Please try again.");
        }
      } else if (error?.request) {
        setError("Server unavailable. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue learning</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
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
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;