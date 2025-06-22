import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { usePromptGuidanceBot } from '@/hooks/usePromptGuidanceBot';
interface PromptGuidanceBotProps {
  onComplete: (guidanceData: any, finalPrompt: string) => void;
  onCancel: () => void;
  categoryName: string;
  subcategoryName: string;
}

const PromptGuidanceBot: React.FC<PromptGuidanceBotProps> = ({
  onComplete,
  onCancel,
  categoryName,
  subcategoryName,
}) => {
  const {
    currentStep,
    setCurrentStep,
    guidanceData,
    steps,
    currentStepData,
    isLastStep,
    canProceed,
    generateFinalPrompt,
  } = usePromptGuidanceBot(subcategoryName);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleComplete = () => {
    const finalPrompt = generateFinalPrompt();
    onComplete(guidanceData, finalPrompt);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto relative">
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
        aria-label="Close"
        type="button"
      >
        <X className="h-6 w-6" />
      </button>

      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Bot className="h-8 w-8 text-blue-600 mr-2" />
          <CardTitle>Lesson Assistant</CardTitle>
        </div>
        <CardDescription>
          Let me help you create the perfect lesson for {categoryName} → {subcategoryName}
        </CardDescription>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full ${
                  index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
          <p className="text-gray-600 mb-4">{currentStepData.description}</p>
          {currentStepData.component}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onCancel : () => setCurrentStep((prev) => prev - 1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </Button>
          <Button onClick={handleNext} disabled={!canProceed()}>
            {isLastStep ? 'Create Prompt' : 'Next'}
            {!isLastStep && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptGuidanceBot;