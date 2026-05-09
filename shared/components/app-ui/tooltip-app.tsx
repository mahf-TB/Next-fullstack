import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import React from "react";

type TooltipAppProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  className?: string;
};

export function TooltipApp({
  content,
  children,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  className,
}: TooltipAppProps) {
  return (
    <Tooltip>
      <TooltipTrigger render={<button />}>{children}</TooltipTrigger>
      {content && (
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          className={className}
        >
          {content}
        </TooltipContent>
      )}
    </Tooltip>
  );
}

export default TooltipApp;
