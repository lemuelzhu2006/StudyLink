"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatComposerProps {
  onSend?: (message: string) => void
  onPromptSelect?: (text: string) => void
  promptChips?: string[]
  /** Shown when the peer has sent at least one message (quick responses). */
  replyChips?: string[]
  placeholder?: string
  className?: string
}

export function ChatComposer({
  onSend,
  onPromptSelect,
  promptChips,
  replyChips,
  placeholder = "Type a message...",
  className,
}: ChatComposerProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message.trim())
      setMessage("")
    }
  }

  const handlePromptClick = (text: string) => {
    setMessage(text)
    onPromptSelect?.(text)
  }

  return (
    <div className={cn("border-t border-slate-200 bg-white p-3", className)}>
      {replyChips && replyChips.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-slate-500 mb-1.5">Quick replies</p>
          <div className="flex flex-wrap gap-2">
            {replyChips.map((text, i) => (
              <button
                key={`r-${i}`}
                type="button"
                onClick={() => handlePromptClick(text)}
                className="px-3 py-1.5 rounded-lg text-xs bg-emerald-50 text-emerald-900 border border-emerald-100 hover:bg-emerald-100 transition-colors"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}
      {promptChips && promptChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {promptChips.map((text, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handlePromptClick(text)}
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              {text}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder={placeholder}
          rows={2}
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!message.trim()}
          className="flex-shrink-0 p-2.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
