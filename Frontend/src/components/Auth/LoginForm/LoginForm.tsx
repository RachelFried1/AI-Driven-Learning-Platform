import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginFields from './LoginFields';
import LoginError from './LoginError';
import LoginButton from './LoginButton';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSuccess = (user: any) => {
    if (onSuccess) {
      onSuccess();
    } else {
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/lessons');
      }
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue learning</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginError onSwitchToRegister={onSwitchToRegister} />
        <LoginFields
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <LoginButton
          email={email}
          password={password}
          onSuccess={handleSuccess}
        />
      </CardContent>
    </Card>
  );
};

export default LoginForm;