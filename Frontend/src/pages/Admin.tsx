
import React from 'react';
import { Shield, Users, BarChart3 } from 'lucide-react';
import Dashboard from '../components/AdminDashboard/Dashboard';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-red-100 rounded-lg mr-3">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl">
            Monitor platform activity, view user engagement, and analyze learning patterns 
            across the AI Learning Platform.
          </p>
        </div>

        <Dashboard />
      </div>
    </div>
  );
};

export default Admin;
