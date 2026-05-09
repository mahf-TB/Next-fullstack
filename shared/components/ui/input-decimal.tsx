import { cn } from "@/shared/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./input";

export type InputDecimalProps = {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  decimals?: number; // max decimal places to display/round to
  prefix?: string;   // e.g. "$", "€"
  suffix?: string;   // e.g. "%", "kg"
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};

function formatDisplay(n: number, decimals?: number): string {
  if (typeof n !== "number" || isNaN(n)) return "";
  if (decimals !== undefined) {
    // Trim trailing zeros up to max decimals
    return parseFloat(n.toFixed(decimals)).toString();
  }
  return String(n);
}

export function InputDecimal({
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
  onFocus,
  onBlur,
}: InputDecimalProps) {
  const [inputValue, setInputValue] = useState(() => formatDisplay(value, decimals));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setInputValue(formatDisplay(value, decimals));
    }
  }, [value, decimals]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (/^[0-9]*[.,]?[0-9]*$/.test(raw) || raw === "") {
      setInputValue(raw);
    }
  }, []);

  const commitValue = useCallback(() => {
    const normalized = inputValue.replace(",", ".");
    const parsed = parseFloat(normalized);

    if (!isNaN(parsed)) {
      const scale = Math.pow(10, decimals ?? 4);
      let rounded = Math.round(parsed * scale) / scale;
      if (min !== undefined) rounded = Math.max(min, rounded);
      if (max !== undefined) rounded = Math.min(max, rounded);
     onChange && onChange(rounded);
      setInputValue(formatDisplay(rounded, decimals));
    } else {
      setInputValue(formatDisplay(value, decimals));
    }

    onBlur?.();
  }, [inputValue, decimals, min, max, onChange, value, onBlur]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.currentTarget.blur();
  }, []);

  return (
    <div className={cn("relative flex items-center", className)}>
      {prefix && (
        <span className="pointer-events-none absolute left-2.5 text-sm text-muted-foreground select-none">
          {prefix}
        </span>
      )}
      <Input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={handleChange}
        onBlur={commitValue}
        onKeyDown={handleKeyDown}
        onFocus={(e) => {
          e.target.select();
          onFocus?.();
        }}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "h-9 w-full rounded-md border border-input bg-transparent text-sm tabular-nums outline-none",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          prefix ? "pl-7" : "pl-1",
          suffix ? "pr-7" : "pr-1",
          inputClassName,
        )}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-2.5 text-sm text-muted-foreground select-none">
          {suffix}
        </span>
      )}
    </div>
  );
}
