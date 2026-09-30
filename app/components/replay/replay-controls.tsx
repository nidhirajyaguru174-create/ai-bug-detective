"use client";

import { SkipBack, Play, Pause, SkipForward, RotateCcw } from "lucide-react";

interface ReplayControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  isComplete: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onRestart: () => void;
}

export default function ReplayControls({
  currentStep,
  totalSteps,
  isPlaying,
  isComplete,
  onPrevious,
  onNext,
  onTogglePlay,
  onRestart,
}: ReplayControlsProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Control buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            disabled={currentStep === 1}
            className="p-2 rounded-lg text-foreground-secondary hover:bg-surface-secondary hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous step"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={onTogglePlay}
            disabled={isComplete}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play
              </>
            )}
          </button>
          <button
            onClick={onNext}
            disabled={currentStep === totalSteps}
            className="p-2 rounded-lg text-foreground-secondary hover:bg-surface-secondary hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next step"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <button
            onClick={onRestart}
            className="p-2 rounded-lg text-foreground-secondary hover:bg-surface-secondary hover:text-foreground transition-colors"
            aria-label="Restart replay"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator + progress */}
        <div className="flex-1 w-full sm:w-auto">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono text-foreground-secondary">
              Step {currentStep} of {totalSteps}
            </span>
            {isComplete && (
              <span className="text-xs font-medium text-resolved-600">
                Replay complete
              </span>
            )}
          </div>
          <div className="w-full h-1.5 bg-surface-tertiary rounded-full">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
