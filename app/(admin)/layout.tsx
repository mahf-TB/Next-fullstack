import { Role } from "@/generated/prisma/client"
import { SidebarHover } from "@/shared/components/common/SidebarHover"
import { auth } from "@/shared/lib/auth"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/")
  }
  return <SidebarHover>{children}</SidebarHover>
}

export default AdminLayout
