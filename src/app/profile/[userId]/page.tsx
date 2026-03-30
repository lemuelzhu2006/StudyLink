import { ALL_STUDENTS } from "@/lib/mock-data"
import { OtherProfileClient } from "./OtherProfileClient"

export function generateStaticParams() {
  return ALL_STUDENTS.map((s) => ({ userId: s.id }))
}

export default function OtherProfilePage() {
  return <OtherProfileClient />
}
