
class ActionProvider {
  createChatBotMessage: any;
  setState: any;
  state: string;
  promptData: {
    topic: string;
    ageGroup: string;
    level: string;
    preferences: string;
  };

  constructor(createChatBotMessage: any, setStateFunc: any) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.state = 'waiting_topic';
    this.promptData = {
      topic: '',
      ageGroup: '',
      level: '',
      preferences: ''
    };
  }

  handleTopic = (topic: string) => {
    this.promptData.topic = topic;
    this.state = 'waiting_age';
    
    const message = this.createChatBotMessage(
      `Great! You want to learn about ${topic}. What age group is this lesson for? (elementary, middle school, high school, college, or adult)`
    );
    
    this.updateChatbotState(message);
  };

  handleAgeGroup = (ageGroup: string) => {
    this.promptData.ageGroup = ageGroup;
    this.state = 'waiting_level';
    
    const message = this.createChatBotMessage(
      "Perfect! What's your current level with this topic? (beginner, some knowledge, intermediate, advanced)"
    );
    
    this.updateChatbotState(message);
  };

  handleLevel = (level: string) => {
    this.promptData.level = level;
    this.state = 'waiting_preferences';
    
    const message = this.createChatBotMessage(
      "Excellent! Would you like me to include: review questions, summary, examples, or follow-up topics? (You can say multiple things or 'none')"
    );
    
    this.updateChatbotState(message);
  };

  handlePreferences = (preferences: string) => {
    this.promptData.preferences = preferences;
    this.generateFinalPrompt();
  };

  generateFinalPrompt = () => {
    const { topic, ageGroup, level, preferences } = this.promptData;
    
    let finalPrompt = `Create a comprehensive lesson about ${topic} for ${ageGroup} learners at ${level} level.`;
    
    if (preferences !== 'none') {
      finalPrompt += ` Please include: ${preferences}.`;
    }
    
    finalPrompt += ' Make it engaging and educational.';
    
    const message = this.createChatBotMessage(
      `Perfect! I've created your prompt: "${finalPrompt}". I'll send this to the main form for you!`
    );
    
    this.updateChatbotState(message);
    
    // Trigger the prompt generation callback
    setTimeout(() => {
      if ((window as any).onPromptGenerated) {
        (window as any).onPromptGenerated(finalPrompt);
      }
      
      const completionMessage = this.createChatBotMessage(
        "Great! I've sent your prompt to the main form. You can now submit it to generate your AI lesson!"
      );
      
      this.updateChatbotState(completionMessage);
      this.resetConversation();
    }, 1000);
  };

  resetConversation = () => {
    this.state = 'waiting_topic';
    this.promptData = {
      topic: '',
      ageGroup: '',
      level: '',
      preferences: ''
    };
  };

  updateChatbotState = (message: any) => {
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
