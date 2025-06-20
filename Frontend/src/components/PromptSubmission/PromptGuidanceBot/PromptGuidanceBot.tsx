import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, ArrowLeft, ArrowRight } from 'lucide-react';
import AgeGroupStep from './AgeGroupStep';
import StageStep from './StageStep';
import PreferencesStep from './PreferencesStep';
import CustomPromptStep from './CustomPromptStep';

interface GuidanceData {
  ageGroup: string;
  stage: string;
  reviewBasics: boolean;
  includeSummary: boolean;
  includeQuestions: boolean;
  includeFollowUp: boolean;
  customPrompt: string;
}

interface PromptGuidanceBotProps {
  onComplete: (guidanceData: GuidanceData, finalPrompt: string) => void;
  onCancel: () => void;
  categoryName: string;
  subcategoryName: string;
}

function getSteps(
  guidanceData: GuidanceData,
  setGuidanceData: React.Dispatch<React.SetStateAction<GuidanceData>>,
  subcategoryName: string
) {
  return [
    {
      id: 'age-group',
      title: 'Who is this lesson for?',
      description: 'Select the target age group for this lesson',
      component: (
        <AgeGroupStep
          value={guidanceData.ageGroup}
          onChange={(value) => setGuidanceData((prev) => ({ ...prev, ageGroup: value }))}
        />
      ),
    },
    {
      id: 'stage',
      title: "What's your current level?",
      description: 'Where are you in your learning journey?',
      component: (
        <StageStep
          value={guidanceData.stage}
          onChange={(value) => setGuidanceData((prev) => ({ ...prev, stage: value }))}
        />
      ),
    },
    {
      id: 'preferences',
      title: 'Lesson preferences',
      description: 'What would you like included in your lesson?',
      component: (
        <PreferencesStep
          reviewBasics={guidanceData.reviewBasics}
          includeSummary={guidanceData.includeSummary}
          includeQuestions={guidanceData.includeQuestions}
          includeFollowUp={guidanceData.includeFollowUp}
          onChange={(field, value) => setGuidanceData((prev) => ({ ...prev, [field]: value }))}
        />
      ),
    },
    {
      id: 'custom-prompt',
      title: 'Your specific request',
      description: 'Tell me exactly what you want to learn',
      component: (
        <CustomPromptStep
          value={guidanceData.customPrompt}
          onChange={(value) => setGuidanceData((prev) => ({ ...prev, customPrompt: value }))}
          subcategoryName={subcategoryName}
        />
      ),
    },
  ];
}

function generateFinalPrompt(
  guidanceData: GuidanceData,
  categoryName: string,
  subcategoryName: string
) {
  let prompt = `Create a lesson about ${subcategoryName} in ${categoryName}. `;

  if (guidanceData.ageGroup) {
    const ageGroupMap: { [key: string]: string } = {
      elementary: 'elementary school students (6-11 years)',
      middle: 'middle school students (12-14 years)',
      high: 'high school students (15-18 years)',
      college: 'college students (18+ years)',
      adult: 'adult learners',
    };
    prompt += `This lesson is for ${ageGroupMap[guidanceData.ageGroup]}. `;
  }

  if (guidanceData.stage) {
    const stageMap: { [key: string]: string } = {
      beginner: 'complete beginners',
      novice: 'learners with some basic knowledge',
      intermediate: 'intermediate level learners',
      advanced: 'advanced learners',
      expert: 'expert level learners',
    };
    prompt += `Tailor the content for ${stageMap[guidanceData.stage]}. `;
  }

  if (guidanceData.reviewBasics) {
    prompt += 'Start by reviewing the fundamental concepts. ';
  }

  prompt += guidanceData.customPrompt + '. ';

  if (guidanceData.includeSummary) {
    prompt += 'Include a comprehensive summary at the end. ';
  }

  if (guidanceData.includeQuestions) {
    prompt += 'Add practice questions and exercises for review. ';
  }

  if (guidanceData.includeFollowUp) {
    prompt += 'Suggest related topics for follow-up learning. ';
  }

  return prompt.trim();
}

const PromptGuidanceBot: React.FC<PromptGuidanceBotProps> = ({
  onComplete,
  onCancel,
  categoryName,
  subcategoryName,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [guidanceData, setGuidanceData] = useState<GuidanceData>({
    ageGroup: '',
    stage: '',
    reviewBasics: false,
    includeSummary: false,
    includeQuestions: false,
    includeFollowUp: false,
    customPrompt: '',
  });

  const steps = getSteps(guidanceData, setGuidanceData, subcategoryName);
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return guidanceData.ageGroup !== '';
      case 1:
        return guidanceData.stage !== '';
      case 2:
        return true;
      case 3:
        return guidanceData.customPrompt.trim() !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleComplete = () => {
    const finalPrompt = generateFinalPrompt(guidanceData, categoryName, subcategoryName);
    onComplete(guidanceData, finalPrompt);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
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
            {isLastStep ? 'Create Lesson' : 'Next'}
            {!isLastStep && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptGuidanceBot;