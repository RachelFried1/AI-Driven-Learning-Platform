import { useState } from 'react';
import AgeGroupStep from '@/components/PromptSubmission/PromptGuidanceBot/AgeGroupStep';
import StageStep from '@/components/PromptSubmission/PromptGuidanceBot/StageStep';
import PreferencesStep from '@/components/PromptSubmission/PromptGuidanceBot/PreferencesStep';
import CustomPromptStep from '@/components/PromptSubmission/PromptGuidanceBot/CustomPromptStep';

export interface GuidanceData {
  ageGroup: string;
  stage: string;
  reviewBasics: boolean;
  includeSummary: boolean;
  includeQuestions: boolean;
  includeFollowUp: boolean;
  customPrompt: string;
}

export function usePromptGuidanceBot(subcategoryName: string) {
  const [currentStep, setCurrentStep] = useState<number>(0);
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
        <AgeGroupStep
          value={guidanceData.ageGroup}
          onChange={(value: string) =>
            setGuidanceData((prev) => ({ ...prev, ageGroup: value }))
          }
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
          onChange={(value: string) =>
            setGuidanceData((prev) => ({ ...prev, stage: value }))
          }
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
          onChange={(field: string, value: boolean) =>
            setGuidanceData((prev) => ({ ...prev, [field]: value }))
          }
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
          onChange={(value: string) =>
            setGuidanceData((prev) => ({ ...prev, customPrompt: value }))
          }
          subcategoryName={subcategoryName}
        />
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
        return true;
      case 3:
        return guidanceData.customPrompt.trim() !== '';
      default:
        return false;
    }
  };

  function generateFinalPrompt() {
    let prompt = '';
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

    prompt += 'Focus on ' + guidanceData.customPrompt + '. ';

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

  return {
    currentStep,
    setCurrentStep,
    guidanceData,
    setGuidanceData,
    steps,
    currentStepData,
    isLastStep,
    canProceed,
    generateFinalPrompt,
  };
}