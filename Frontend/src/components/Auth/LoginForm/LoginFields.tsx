import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFieldsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

const LoginFields: React.FC<LoginFieldsProps> = ({
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
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
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        placeholder="Enter your password"
      />
    </div>
  </div>
);

export default LoginFields;