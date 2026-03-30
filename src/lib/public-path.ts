/**
 * Prefix for files under `public/` when the app is deployed with a basePath
 * (e.g. GitHub Pages at https://user.github.io/repo-name/).
 */
export function publicUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const p = path.startsWith("/") ? path : `/${path}`
  return `${base}${p}`
}
