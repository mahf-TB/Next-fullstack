import { Prisma, PrismaClient } from "@/generated/prisma/client"
import bcrypt from "bcryptjs"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })


const userData: Prisma.UserCreateInput[] = [
  {
    name: process.env.ADMIN_EMAIL?.split("@")[0] || "admin",
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10),
    role: "ADMIN",
  },
]

async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }

  console.log("✅ Admin user seeded")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
