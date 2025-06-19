
import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

interface ChatBotWidgetProps {
  onPromptGenerated?: (prompt: string) => void;
}

const ChatBotWidget: React.FC<ChatBotWidgetProps> = ({ onPromptGenerated }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Set up the global callback for prompt generation
  React.useEffect(() => {
    if (onPromptGenerated) {
      (window as any).onPromptGenerated = onPromptGenerated;
    }
    
    return () => {
      delete (window as any).onPromptGenerated;
    };
  }, [onPromptGenerated]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 z-50 shadow-2xl rounded-lg overflow-hidden bg-white border">
          <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
            <h3 className="font-medium">Learning Assistant</h3>
            <Button
              onClick={() => setIsOpen(false)}
              size="icon"
              variant="ghost"
              className="h-6 w-6 text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-full">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotWidget;
