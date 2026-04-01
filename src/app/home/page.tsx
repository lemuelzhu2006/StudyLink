"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CalendarDays, X } from "lucide-react"
import { TopBar } from "@/components/TopBar"
import { MapPreviewCard } from "@/components/MapPreviewCard"
import { SessionCardCollapsed } from "@/components/SessionCardCollapsed"
import { SessionCardExpanded } from "@/components/SessionCardExpanded"
import { Avatar } from "@/components/Avatar"
import { getRecommendedSessions, formatSessionDate, formatTimeRange } from "@/lib/mock-data"
import { useAppStore } from "@/context/AppStoreContext"

function HomeContent() {
  const searchParams = useSearchParams()
  const { store, addSavedPartner, isPartnerSaved } = useAppStore()
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null)
  const [sameCourseOnly, setSameCourseOnly] = useState(false)
  const [dismissProfileBanner, setDismissProfileBanner] = useState(false)

  const noMatch = searchParams.get("no-match") === "1"
  const [showNoMatch, setShowNoMatch] = useState(false)
  const hasMatchedPartner = !!store.matchedPartner

  const upcomingSessions = store.sessions.filter(
    (s) => s.status === "upcoming" || s.status === "matched" || s.status === "confirmed"
  ).slice(0, 2)

  useEffect(() => {
    if (noMatch) {
      setShowNoMatch(true)
      const t = setTimeout(() => setShowNoMatch(false), 4000)
      return () => clearTimeout(t)
    }
  }, [noMatch])

  const allRecommended = getRecommendedSessions(
    store.user.courses,
    store.defaultLocation,
    store.user.habits
  )
  const hasUserCourses = store.user.courses
    .split(",")
    .some((c) => c.trim().length > 0)
  const showProfileCoursesBanner = !hasUserCourses && !dismissProfileBanner
  const recommendedSessions =
    sameCourseOnly && hasUserCourses
      ? allRecommended.filter((s) => s.recommendationReasons.includes("same-course"))
      : allRecommended

  const toggleExpand = (id: string) => {
    setExpandedSessionId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="flex flex-col min-h-[780px]">
      <TopBar locationChip={store.defaultLocation} />

      <main className="flex-1 overflow-y-auto px-4 pb-24">
        {showProfileCoursesBanner && (
          <div className="my-3 flex gap-2 p-3 rounded-xl bg-sky-50 border border-sky-100 text-sm text-sky-950">
            <p className="flex-1 min-w-0">
              Add your courses and study habits in your profile so recommendations prioritize classes you care about.
            </p>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setDismissProfileBanner(true)}
                className="p-1 rounded-md text-sky-700 hover:bg-sky-100"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
              <Link href="/profile" className="text-sm font-medium text-sky-700 hover:text-sky-800 whitespace-nowrap">
                Open profile
              </Link>
            </div>
          </div>
        )}
        {showNoMatch && (
          <div className="my-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
            No matching study partners found right now. Try browsing sessions or adjusting your preferences.
          </div>
        )}

        {upcomingSessions.length > 0 && (
          <Link href="/sessions" className="block my-3">
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 hover:bg-sky-100/70 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <CalendarDays className="h-4 w-4 text-sky-600" />
                <span className="text-xs font-semibold text-sky-700 uppercase tracking-wide">
                  Upcoming Sessions ({store.sessions.filter((s) => s.status !== "completed" && s.status !== "cancelled").length})
                </span>
              </div>
              {upcomingSessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-1">
                  <p className="text-sm text-slate-700 truncate">
                    <span className="font-medium">{s.subject}</span> · {formatSessionDate(s.date)}
                  </p>
                  <span className="text-xs text-slate-500">{formatTimeRange(s.startTime, s.endTime)}</span>
                </div>
              ))}
            </div>
          </Link>
        )}

        {hasMatchedPartner && store.matchedPartner && (
          <div className="my-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
            <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide">My match</p>
            <div className="flex items-center gap-3 mt-2">
              <Avatar src={store.matchedPartner.student.avatar} size="md" className="bg-emerald-200 text-emerald-800" />
              <div>
                <p className="font-medium text-slate-800">{store.matchedPartner.student.name}</p>
                <p className="text-sm text-slate-600">
                  {store.matchedPartner.session.location} · {store.matchedPartner.session.course}
                </p>
              </div>
              <Link
                href={`/chat?partner=${store.matchedPartner.student.id}`}
                className="ml-auto py-2 px-4 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
              >
                Chat
              </Link>
            </div>
          </div>
        )}

        <MapPreviewCard className="my-4" sessions={recommendedSessions} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mt-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Recommended Sessions</h2>
            <p className="text-sm text-slate-600 mt-1">
              Based on your course, study preferences, and default location. Stronger course matches are listed first.
            </p>
            <label
              className={`mt-2 inline-flex items-center gap-2 text-sm ${
                hasUserCourses ? "text-slate-700 cursor-pointer" : "text-slate-400 cursor-not-allowed"
              }`}
              title={
                hasUserCourses
                  ? "Show only sessions that share a course with your profile"
                  : "Add courses in your profile to filter by same course"
              }
            >
              <input
                type="checkbox"
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                checked={sameCourseOnly}
                disabled={!hasUserCourses}
                onChange={(e) => setSameCourseOnly(e.target.checked)}
              />
              Same course only
            </label>
          </div>
          <Link href="/browse" className="text-sm font-medium text-sky-600 hover:text-sky-700 shrink-0">
            Browse all
          </Link>
        </div>

        <div className="space-y-3 mt-4">
          {recommendedSessions.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">
              {sameCourseOnly && hasUserCourses && allRecommended.length > 0 ? (
                <>
                  No same-course matches right now.{" "}
                  <button
                    type="button"
                    className="text-sky-600 font-medium hover:text-sky-700"
                    onClick={() => setSameCourseOnly(false)}
                  >
                    Show all recommendations
                  </button>{" "}
                  or try{" "}
                  <Link href="/browse" className="text-sky-600 font-medium hover:text-sky-700">
                    Browse all
                  </Link>
                  .
                </>
              ) : (
                "Complete your profile and preferences to see recommended sessions."
              )}
            </p>
          ) : (
            recommendedSessions.map((session) => (
              <div key={session.id}>
                {expandedSessionId === session.id ? (
                  <SessionCardExpanded
                    session={session}
                    onSavePartner={addSavedPartner}
                    isSaved={isPartnerSaved(session.student.id)}
                  />
                ) : (
                  <SessionCardCollapsed
                    session={session}
                    expanded={false}
                    isSaved={isPartnerSaved(session.student.id)}
                    onClick={() => toggleExpand(session.id)}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center"><p className="text-slate-500">Loading...</p></div>}>
      <HomeContent />
    </Suspense>
  )
}
