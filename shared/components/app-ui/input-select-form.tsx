import DecimalForm from "@/shared/components/app-ui/decimal-form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { SelectNative } from "@/shared/components/ui/select-native";
import { cn } from "@/shared/lib/utils";
import { useId } from "react";

type Option = { label: string; value: string; code?: string };

type InputSelectFormProps = {
  id?: string;
  value?: number | string;
  onChange?: (value?: number | string) => void;
  options?: Option[]; // options for select/combobox
  selectValue?: string;
  onSelectChange?: (id?: string) => void;
  onChangeCombined?: (payload: {
    value?: number | string;
    selectValue?: string;
  }) => void;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
  allowText?: boolean;
};

export default function InputSelectForm({
  id,
  value,
  onChange,
  options = [],
  selectValue,
  onSelectChange,
  onChangeCombined,
  prefix,
  suffix,
  decimals = 2,
  placeholder,
  className,
  label,
  required,
  allowText = false,
}: InputSelectFormProps) {
  const inputId = id ?? useId();
  const isWithSelect = options.length > 0;

  const emitCombined = (v?: number | string, s?: string) => {
    onChange?.(v);
    onSelectChange?.(s);
    onChangeCombined?.({ value: v, selectValue: s ?? selectValue });
  };

  const handleValueChange = (v?: number | string) =>
    emitCombined(v, selectValue);
  const handleSelectChange = (s?: string) => emitCombined(value, s);

  return (
    <div className={cn("*:not-first:mt-2", className)}>
      {label && (
        <Label htmlFor={inputId} className="font-medium text-xs mb-2">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div className="flex rounded-md shadow-xs">
        <div className="relative">
          {allowText ? (
            <>
              <Input
                id={inputId}
                value={String(value ?? "")}
                className={cn(
                  "-me-px  shadow-none focus-visible:z-10",
                  prefix && "ps-6 pe-12",
                  isWithSelect && "rounded-e-none ",
                )}
                onChange={(e: any) => handleValueChange(e.target.value)}
                placeholder={placeholder}
              />
              {prefix && (
                <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                  {prefix ?? ""}
                </span>
              )}
              {suffix && (
                <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                  {suffix ?? ""}
                </span>
              )}
            </>
          ) : (
            <DecimalForm
              inputClassName={cn(
                "-me-px ps-6 peer  shadow-none focus-visible:z-10",
                isWithSelect && "rounded-e-none ",
              )}
              id={inputId}
              value={typeof value === "number" ? value : Number(value) || 0}
              onChange={(num: number) => handleValueChange(num)}
              decimals={decimals}
              placeholder={placeholder}
              prefix={prefix}
              suffix={suffix}
            />
          )}
        </div>
        {isWithSelect && (
          <div className="w-fit">
            <SelectNative
              value={selectValue}
              onChange={(e: any) => handleSelectChange(e.target.value)}
              className="w-fit rounded-s-none text-foreground shadow-none hover:text-foreground"
            >
              <option defaultChecked disabled>
                Choisie
              </option>
              {options.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.code ?? u.label}
                </option>
              ))}
            </SelectNative>
          </div>
        )}
      </div>
    </div>
  );
}

export { InputSelectForm };
