import { auth } from "@/shared/lib/auth"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

async function AuthLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (session) {
    redirect("/dashboard")
  }
  return <>{children}</>
}

export default AuthLayout

