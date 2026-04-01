"use client"

import { RecommendationReason, RECOMMENDATION_LABELS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const REASON_CHIP_CLASS: Record<RecommendationReason, string> = {
  "same-course": "bg-violet-50 text-violet-900 border-violet-100",
  "similar-study-style": "bg-amber-50 text-amber-900 border-amber-100",
  "near-default-location": "bg-cyan-50 text-cyan-900 border-cyan-100",
  "same-goal": "bg-teal-50 text-teal-900 border-teal-100",
}

interface RecommendationReasonChipsProps {
  reasons: RecommendationReason[]
  className?: string
}

export function RecommendationReasonChips({
  reasons,
  className,
}: RecommendationReasonChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {reasons.map((reason) => (
        <span
          key={reason}
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
            REASON_CHIP_CLASS[reason]
          )}
        >
          {RECOMMENDATION_LABELS[reason]}
        </span>
      ))}
    </div>
  )
}
