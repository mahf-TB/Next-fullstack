import { cn } from "@/shared/lib/utils";

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
  className?: string;
};

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <div className={cn("grid gap-1 md:grid-cols-[250px_1fr] py-2.5", className)}>
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium">{value ?? "—"}</span>
    </div>
  );
}