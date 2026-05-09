import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";
import { LucideIcon } from "lucide-react";
import {
  Eye as EyeIcon,
  EyeOff as ViewOffSlashIcon,
} from "lucide-react";
import * as React from "react";

type FormInputProps = React.ComponentProps<"input"> & {
  label?: string;
  hideLabel?: boolean;
  requiredMark?: boolean;
  containerClassName?: string;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  description?: string;
};

export default function InputForm({
  id,
  label,
  hideLabel = false,
  requiredMark = false,
  containerClassName,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className,
  required,
  description,
  type = "text",
  ...props
}: FormInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? props.name ?? generatedId;

  const isPasswordField = type === "password";
  const [isVisible, setIsVisible] = React.useState(false);

  const effectiveType = isPasswordField
    ? isVisible
      ? "text"
      : "password"
    : type;

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div className={cn("*:not-first:mt-1", containerClassName)}>
      {!hideLabel && label && (
        <Label htmlFor={inputId} className="font-medium text-xs mb-2">
          {label}
          {(required || requiredMark) && (
            <span className="text-destructive">*</span>
          )}
        </Label>
      )}

      <div className="relative flex items-center">
        {IconLeft && (
          <span className="pointer-events-none absolute left-3 text-muted-foreground">
            <IconLeft strokeWidth={2} className="h-5 w-5" />
          </span>
        )}

        <Input
          id={inputId}
          required={required}
          type={effectiveType}
          size={50}
          className={cn(
            IconLeft && "pl-10",
            isPasswordField || IconRight ? "pr-10" : "",
            className,
          )}
          {...props}
        />

        {/* Bouton œil si mot de passe */}
        {isPasswordField && (
          <button
            type="button"
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            className="absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <ViewOffSlashIcon className="h-4 w-4" strokeWidth={2} />
            ) : (
              <EyeIcon className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        )}

        {/* Icône droite classique */}
        {!isPasswordField && IconRight && (
          <span className="absolute right-3 text-muted-foreground">
            <IconRight strokeWidth={2} className="h-5 w-5" />
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}