
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Bot, ArrowLeft, ArrowRight } from 'lucide-react';

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

  const steps = [
    {
      id: 'age-group',
      title: 'Who is this lesson for?',
      description: 'Select the target age group for this lesson',
      component: (
        <div className="space-y-4">
          <Label>Age Group</Label>
          <Select
            value={guidanceData.ageGroup}
            onValueChange={(value) => setGuidanceData({ ...guidanceData, ageGroup: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="elementary">Elementary (6-11 years)</SelectItem>
              <SelectItem value="middle">Middle School (12-14 years)</SelectItem>
              <SelectItem value="high">High School (15-18 years)</SelectItem>
              <SelectItem value="college">College (18+ years)</SelectItem>
              <SelectItem value="adult">Adult Learner</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      id: 'stage',
      title: 'What\'s your current level?',
      description: 'Where are you in your learning journey?',
      component: (
        <div className="space-y-4">
          <Label>Learning Stage</Label>
          <Select
            value={guidanceData.stage}
            onValueChange={(value) => setGuidanceData({ ...guidanceData, stage: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Complete Beginner</SelectItem>
              <SelectItem value="novice">Some Knowledge</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      id: 'preferences',
      title: 'Lesson preferences',
      description: 'What would you like included in your lesson?',
      component: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="review"
              checked={guidanceData.reviewBasics}
              onCheckedChange={(checked) =>
                setGuidanceData({ ...guidanceData, reviewBasics: !!checked })
              }
            />
            <Label htmlFor="review">Review the basics first</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="summary"
              checked={guidanceData.includeSummary}
              onCheckedChange={(checked) =>
                setGuidanceData({ ...guidanceData, includeSummary: !!checked })
              }
            />
            <Label htmlFor="summary">Include a summary at the end</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="questions"
              checked={guidanceData.includeQuestions}
              onCheckedChange={(checked) =>
                setGuidanceData({ ...guidanceData, includeQuestions: !!checked })
              }
            />
            <Label htmlFor="questions">Add review questions</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="followup"
              checked={guidanceData.includeFollowUp}
              onCheckedChange={(checked) =>
                setGuidanceData({ ...guidanceData, includeFollowUp: !!checked })
              }
            />
            <Label htmlFor="followup">Suggest a follow-up lesson</Label>
          </div>
        </div>
      ),
    },
    {
      id: 'custom-prompt',
      title: 'Your specific request',
      description: 'Tell me exactly what you want to learn',
      component: (
        <div className="space-y-4">
          <Label htmlFor="prompt">What would you like to learn about?</Label>
          <Input
            id="prompt"
            value={guidanceData.customPrompt}
            onChange={(e) => setGuidanceData({ ...guidanceData, customPrompt: e.target.value })}
            placeholder={`e.g., "Explain ${subcategoryName} with practical examples"`}
            className="min-h-[100px]"
          />
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return guidanceData.ageGroup !== '';
      case 1:
        return guidanceData.stage !== '';
      case 2:
        return true; // Preferences are optional
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
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    const finalPrompt = generateFinalPrompt();
    onComplete(guidanceData, finalPrompt);
  };

  const generateFinalPrompt = () => {
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
            onClick={currentStep === 0 ? onCancel : () => setCurrentStep(currentStep - 1)}
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
