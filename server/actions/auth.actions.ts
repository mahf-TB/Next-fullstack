"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/shared/lib/auth"
import { loginSchema, LoginDtoType } from "../dtos/login.dto"

export async function login(data: LoginDtoType) {
  const validated = loginSchema.safeParse(data)

  if (!validated.success) {
    return {
      success: false,
      message: "Données invalides",
    }
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
    })

    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Email ou mot de passe incorrect",
          }

        default:
          return {
            success: false,
            message: "Erreur d'authentification",
          }
      }
    }

    throw error
  }
}
