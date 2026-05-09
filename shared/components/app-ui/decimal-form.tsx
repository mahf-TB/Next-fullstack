import React from "react";
import { InputDecimal } from "../ui/input-decimal";
import { Label } from "../ui/label";
import { cn } from "@/shared/lib/utils";

export type DecimalFormProps = {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  decimals?: number; // max decimal places to display/round to
  prefix?: string; // e.g. "$", "€"
  suffix?: string; // e.g. "%", "kg"
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
};

const DecimalForm = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  decimals,
  prefix,
  suffix,
  placeholder,
  disabled,
  className,
  inputClassName,
  required,
}: DecimalFormProps) => {
  const generatedId = React.useId();
  const inputId = id ?? label ?? generatedId;
  return (
    <div className={cn("*:not-first:mt-1", className)}>
      {label && (
        <Label htmlFor={inputId} className="font-medium text-xs mb-2">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <InputDecimal
        value={value as number}
        onChange={onChange}
        placeholder={placeholder}
        suffix={suffix}
        prefix={prefix}
        min={min}
        max={max}
        decimals={decimals}
        disabled={disabled}
        inputClassName={inputClassName}
      />
    </div>
  );
};

export default DecimalForm;
