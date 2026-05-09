"use client"

import { cn } from "@/shared/lib/utils"
import {
  Brain,
  Compass,
  Landmark,
  LogOut,
  SquaresExclude,
  TrendingUp,
  UserCircle,
} from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

const NAV_ITEMS = [
  { name: "Home", url: "/dashboard", icon: Landmark },
  { name: "Conseils", url: "/suggestions", icon: Brain },
  { name: "Explorer", url: "/explore", icon: Compass },
  { name: "Stats", url: "/stats", icon: TrendingUp, badge: 1 },
  { name: "Profile", url: "/profile", icon: UserCircle },
]

const FOOTER_ITEMS = [{ name: "Déconnexion", icon: LogOut }]

export function SidebarHover({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <div className="grid h-screen overflow-hidden">
      {/* Sidebar */}
      <nav className="group/sidebar fixed top-0 hidden h-screen w-16 flex-col gap-5 overflow-hidden border-white/8 py-4 transition-all duration-250 ease-in-out hover:w-55 lg:flex">
        {/* Logo */}
        <div className="flex h-13 items-center gap-3 px-3">
          <div className="flex size-8 items-center justify-center rounded-full border border-primary/50 bg-primary/50 dark:border-primary dark:bg-primary/30">
            <SquaresExclude className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Nav items */}
        <div className="flex flex-1 flex-col gap-3 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = pathname === item.url
            return (
              <Link key={item.name} href={item.url}>
                <div
                  className={cn(
                    "flex h-11 cursor-pointer items-center gap-4 rounded-xl px-2",
                    "transition-colors duration-150",
                    "-translate-x-5 pl-7 hover:bg-black/8 dark:hover:bg-white/8",
                  )}
                >
                  <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                    <Icon
                      size={28}
                      strokeWidth={active ? 2.6 : 1.5}
                      className={active ? "text-primary":""}
                    />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full border-[1.5px] border-black bg-red-500 group-hover/sidebar:hidden" />
                    )}
                  </div>

                  <span
                    className={cn(
                      "text-base whitespace-nowrap",
                      "-translate-x-2 opacity-0",
                      "group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100",
                      "transition-all duration-180",
                      active ? "font-extrabold text-primary" : "font-normal"
                    )}
                  >
                    {item.name}
                  </span>

                  {item.badge && (
                    <span className="ml-auto hidden h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white group-hover/sidebar:flex">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-0.5 px-2">
          {FOOTER_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.name}
                type="button"
                onClick={handleLogout}
                className="flex h-11 w-full cursor-pointer items-center gap-3.5 rounded-xl px-2 text-left transition-colors duration-150 hover:bg-white/8"
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className="shrink-0 text-white"
                />
                <span className="-translate-x-2 text-sm font-normal whitespace-nowrap text-white opacity-0 transition-all duration-180 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100">
                  {item.name}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
      {/* Nav items  Mobile*/}
      <nav className="fixed bottom-0 z-50 w-full border-t bg-background py-2 lg:hidden">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = pathname === item.url
            return (
              <Link key={item.name} href={item.url}>
                <div
                  className={cn(
                    "flex h-11 cursor-pointer items-center gap-4",
                    "transition-colors duration-150"
                  )}
                >
                  <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                    <Icon
                      size={28}
                      strokeWidth={active ? 2.6 : 1.5}
                    />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full border-[1.5px] border-black bg-red-500 group-hover/sidebar:hidden" />
                    )}
                  </div>

                  {/* <span
                    className={cn(
                      "text-base whitespace-nowrap text-white",
                      "-translate-x-2 opacity-0",
                      "group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100",
                      "transition-all duration-180",
                      active ? "font-bold" : "font-normal"
                    )}
                  >
                    {item.name}
                  </span> */}

                  {item.badge && (
                    <span className="ml-auto hidden h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white group-hover/sidebar:flex">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </nav>
      {/* Main */}
      <main className="min-w-0 overflow-y-auto">
        <div className="mx-auto mb-10 w-full max-w-3xl">{children}</div>
      </main>
    </div>
  )
}
