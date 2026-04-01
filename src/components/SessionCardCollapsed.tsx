"use client"

import { Session, formatSessionDate, VERIFIED_BADGE_TITLE } from "@/lib/mock-data"
import { RecommendationReasonChips } from "./RecommendationReasonChips"
import { Avatar } from "./Avatar"
import { BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface SessionCardCollapsedProps {
  session: Session
  expanded?: boolean
  onClick?: () => void
  /** Saved study partner — subtle highlight on the card */
  isSaved?: boolean
  className?: string
}

export function SessionCardCollapsed({
  session,
  expanded,
  onClick,
  isSaved,
  className,
}: SessionCardCollapsedProps) {
  const { student, location, course, goal, recommendationReasons } = session

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 active:scale-[0.995] transition-all duration-200",
        expanded && "ring-2 ring-sky-300/60 border-sky-300 shadow-md",
        isSaved && !expanded && "ring-2 ring-emerald-200 border-emerald-200",
        className
      )}
    >
      <div className="flex gap-3">
        <Avatar
          src={student.avatar}
          size="lg"
          className={cn(
            "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 shadow-inner",
            isSaved ? "ring-2 ring-emerald-400 ring-offset-2" : "ring-2 ring-white"
          )}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-900 truncate">{student.name}</span>
            {student.verified && (
              <span title={VERIFIED_BADGE_TITLE} className="inline-flex" role="img" aria-label={VERIFIED_BADGE_TITLE}>
                <BadgeCheck className="h-4 w-4 text-sky-500 flex-shrink-0" aria-hidden />
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 truncate">
            {session.date && <>{formatSessionDate(session.date)} · </>}
            <span className="font-medium text-slate-800">{course}</span>
            {" · "}
            {location}
          </p>
          <p className="text-xs text-slate-500 mt-1 truncate">{goal}</p>
          {recommendationReasons.length > 0 && (
            <RecommendationReasonChips
              reasons={recommendationReasons}
              className="mt-2"
            />
          )}
        </div>
        {!expanded && (
          <span className="flex-shrink-0 text-slate-400 text-sm">▼</span>
        )}
      </div>
    </button>
  )
}
