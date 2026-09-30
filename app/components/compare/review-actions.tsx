"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

interface ReviewActionsProps {
  onReview?: () => void;
  isReviewed?: boolean;
}

export default function ReviewActions({ onReview, isReviewed }: ReviewActionsProps) {
  const [reviewed, setReviewed] = useState(false);

  const handleReview = () => {
    setReviewed(true);
    onReview?.();
  };

  const showReviewed = isReviewed || reviewed;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={handleReview}
          disabled={showReviewed}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
            showReviewed
              ? "bg-resolved-50 text-resolved-700 border border-resolved-200"
              : "text-white bg-primary-600 hover:bg-primary-700"
          }`}
        >
          {showReviewed ? (
            <>
              <Check className="w-4 h-4" />
              Reviewed
            </>
          ) : (
            "Mark Fix Reviewed"
          )}
        </button>
        <Link
          href="/investigate/case-0042"
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground-secondary bg-surface border border-border rounded-lg hover:bg-surface-secondary hover:text-foreground transition-colors duration-150"
        >
          Return to Investigation
        </Link>
        <Link
          href="/replay"
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors duration-150"
        >
          Open Replay
        </Link>
      </div>
    </div>
  );
}
