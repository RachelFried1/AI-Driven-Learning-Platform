import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { History, Settings } from 'lucide-react';

interface NavbarLinksProps {
  role?: string;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ role }) => (
  <>
    {role === 'admin' && (
      <Link to="/admin">
        <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
          <Settings className="h-4 w-4 mr-2" />
          Admin
        </Button>
      </Link>
    )}
    <Link to="/lessons">
      <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
        Lessons
      </Button>
    </Link>
    <Link to="/history">
      <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
        <History className="h-4 w-4 mr-2" />
        History
      </Button>
    </Link>
  </>
);

export default NavbarLinks;