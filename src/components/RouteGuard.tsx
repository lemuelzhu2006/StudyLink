"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAppStore } from "@/context/AppStoreContext"

const PUBLIC_PATHS = ["/login", "/"]
const PROFILE_SETUP_PATH = "/profile"

function normalizePathname(pathname: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  if (!basePath) return pathname
  if (pathname === basePath) return "/"
  if (pathname.startsWith(basePath + "/")) {
    return pathname.slice(basePath.length)
  }
  return pathname
}

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const rawPathname = usePathname()
  const pathname = normalizePathname(rawPathname)
  const router = useRouter()
  const { store } = useAppStore()

  const isPublic = PUBLIC_PATHS.includes(pathname)
  const isProfilePage = pathname === PROFILE_SETUP_PATH || pathname === "/"

  useEffect(() => {
    if (isPublic) return

    if (!store.isLoggedIn) {
      router.replace("/login")
      return
    }

    if (!store.profileComplete && !isProfilePage) {
      router.replace("/profile?new=1")
    }
  }, [store.isLoggedIn, store.profileComplete, pathname, router, isPublic, isProfilePage])

  if (isPublic) return <>{children}</>

  if (!store.isLoggedIn) return null

  if (!store.profileComplete && !isProfilePage) return null

  return <>{children}</>
}
