import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

interface GuidanceBotBannerProps {
  onClick: () => void;
}

const GuidanceBotBanner: React.FC<GuidanceBotBannerProps> = ({ onClick }) => (
  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Bot className="h-5 w-5 text-blue-600 mr-2" />
        <div>
          <p className="font-medium text-blue-900">Need help crafting your prompt?</p>
          <p className="text-sm text-blue-700">Our AI assistant can guide you through creating the perfect lesson request</p>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={onClick}
        className="border-blue-300 text-blue-700 hover:bg-blue-100"
      >
        <Bot className="h-4 w-4 mr-2" />
        Get Help
      </Button>
    </div>
  </div>
);

export default GuidanceBotBanner;