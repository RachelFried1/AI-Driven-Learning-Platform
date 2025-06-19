
class MessageParser {
  actionProvider: any;

  constructor(actionProvider: any) {
    this.actionProvider = actionProvider;
  }

  parse(message: string) {
    const lowercase = message.toLowerCase();
    
    if (this.actionProvider.state === 'waiting_topic') {
      this.actionProvider.handleTopic(message);
    } else if (this.actionProvider.state === 'waiting_age') {
      this.actionProvider.handleAgeGroup(message);
    } else if (this.actionProvider.state === 'waiting_level') {
      this.actionProvider.handleLevel(message);
    } else if (this.actionProvider.state === 'waiting_preferences') {
      this.actionProvider.handlePreferences(message);
    } else {
      // Initial state
      this.actionProvider.handleTopic(message);
    }
  }
}

export default MessageParser;
