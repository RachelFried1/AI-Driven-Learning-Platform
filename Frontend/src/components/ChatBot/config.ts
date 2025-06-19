
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage("Hi! I'm here to help you create the perfect prompt for your AI lesson. What would you like to learn about today?",
      {}
    ),
  ],
  botName: "Learning Assistant",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#3b82f6",
    },
    chatButton: {
      backgroundColor: "#3b82f6",
    },
  },
};

export default config;
