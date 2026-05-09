// (auth)/login/page
"use client"

import { login } from "@/server/actions/auth.actions"
import { LoginDtoType, loginSchema } from "@/server/dtos/login.dto"
import InputForm from "@/shared/components/app-ui/input-form"
import { GridBackground } from "@/shared/components/common/GridBackground"
import { Spinner } from "@/shared/components/icons/spinner"
import { Button } from "@/shared/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
function LoginPage() {
  const router = useRouter()
  // State pour les champs du formulaire
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDtoType>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginDtoType) {
    setServerError(null)
    try {
      const res = await login(data)
      if (!res.success) {
        setServerError(res.message || "")
        return
      }
      router.push("/dashboard")
    } catch (error: any) {
      setServerError(error.message || "")
    }
  }

  return (
    <GridBackground className="h-svh rounded-none">
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="w-full max-w-lg rounded p-8">
          <div className="mb-6 text-start">
            <h2 className="font-poppins mb-2 text-2xl font-bold">
              Accédez à l'espace administrateur
            </h2>
            <p className="text-sm text-muted-foreground">
              Connectez-vous pour gérer vos commandes, produits et paramètres.
              Veuillez utiliser votre adresse e-mail et mot de passe.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Email */}
            <div>
              <InputForm
                {...register("email")}
                name="email"
                label="Email"
                type="text"
                required
                aria-label="Email"
                placeholder="votre@email.com"
                iconLeft={Mail}
              />
              {errors.email && (
                <div className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </div>
              )}
            </div>
            {/* Mot de passe */}
            <div>
              <InputForm
                {...register("password")}
                name="password"
                label="Mot de passe"
                type="password"
                required
                aria-label="Mot de passe"
                placeholder="votre mot de passe"
                iconLeft={Lock}
              />
              {errors.password && (
                <div className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </div>
              )}
            </div>
            {/* SERVER ERROR */}

            {serverError && (
              <div className="text-sm text-red-500">{serverError}</div>
            )}
            {/* Button de submit */}
            <Button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded"
              disabled={isSubmitting}
              size={"lg"}
            >
              {isSubmitting && <Spinner size="md" />}
              <span>{isSubmitting ? "Connexion..." : "Se connecter"}</span>
            </Button>
          </form>
        </div>
        <p className="text-xs text-gray-400">
          Nous respectons votre vie privée — vos données ne seront pas
          partagées.
        </p>
      </div>
    </GridBackground>
  )
}

export default LoginPage
