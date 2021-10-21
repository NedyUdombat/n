import React, { useState, useEffect } from 'react';

interface Step {
  stepName: string | number;
  completed: boolean;
}

interface ProgressBarProps {
  steps: Step[];
  activeTab: number;
  tabSwitchCallback?: (activeIndex: number) => void;
}

const ProgressBar = ({
  steps,
  activeTab,
  tabSwitchCallback,
}: ProgressBarProps): JSX.Element => {
  const [stepAmount, setStepAmount] = useState<Step[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>();

  useEffect(() => {
    setStepAmount(steps);
    setActiveStepIndex(activeTab);
  }, [activeTab, steps]);

  const handleStepClick = (index: number) => {
    setActiveStepIndex(index + 1);
    tabSwitchCallback && tabSwitchCallback(index + 1);
  };

  return (
    <>
      {stepAmount && activeStepIndex && (
        <div className="progress-steps">
          {stepAmount.map((step, index) => (
            <button
              key={step.stepName}
              type="button"
              className={`step-btn${
                activeStepIndex === index + 1 ? ` active` : ''
              }${activeStepIndex > index + 1 ? ` past` : ''}${
                step.completed === true ? ` completed` : ''
              }`}
              onClick={() => handleStepClick(index)}
            >
              <div className="active-bar" />
              <p className="step-name">
                {step.stepName ? step.stepName : index}
              </p>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default ProgressBar;
