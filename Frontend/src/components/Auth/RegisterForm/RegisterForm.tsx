import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RegisterFields from './RegisterFields';
import RegisterError from './RegisterError';
import RegisterButton from './RegisterButton';

import { RegisterData } from '../../../types';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const navigate = useNavigate();

  const validate = () => {
    if (!formData.name || formData.name.length > 100) return "Name is required and must be less than 100 characters.";
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) return "Name can only contain letters and spaces.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email address.";
    if (!formData.phone || !/^\+\d{10,15}$/.test(formData.phone)) return "Phone must start with country code (e.g. +972) and contain 10-15 digits.";
    if (!formData.password || formData.password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      navigate('/lessons');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join our AI-powered learning platform</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterError />
        <RegisterFields formData={formData} setFormData={setFormData} />
        <RegisterButton formData={formData} validate={validate} onSuccess={handleSuccess} />
      </CardContent>
    </Card>
  );
};

export default RegisterForm;