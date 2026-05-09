import type { Role } from "@/generated/prisma/client"
import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string
      role: Role
    }
  }

  interface User extends DefaultUser {
    role: Role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role
  }
}

export { }

