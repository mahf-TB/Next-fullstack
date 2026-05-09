"use client";

import { type Tag, TagInput } from "emblor";
import { useId, useState } from "react";

import { Label } from "@/shared/components/ui/label";

export interface InputInnerTagsProps {
  id?: string;
  label?: string;
  tags?: Tag[];
  placeholder?: string;
  styleClasses?: any;
  onChange?: (tags: Tag[]) => void;
}

export default function InputInnerTags({
  id: propsId,
  label = "Input with inner tags",
  tags,
  placeholder = "Add a tag",
  styleClasses,
  onChange,
}: InputInnerTagsProps) {
  const id = propsId ?? useId();

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const mergedStyleClasses = styleClasses ?? {
    inlineTagsContainer:
      "border-input rounded-md dark:bg-input/30 border shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 p-1 gap-1",
    input: "w-full min-w-[80px] shadow-none px-2 h-7",
    tag: {
      body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
      closeButton:
        "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
    },
  };

  return (
    <div className="*:not-first:mt-1">
      {label && (
        <Label className="text-xs font-medium mb-2" htmlFor={id}>
          {label}
        </Label>
      )}
      <TagInput
        activeTagIndex={activeTagIndex}
        id={id}
        placeholder={placeholder}
        setActiveTagIndex={setActiveTagIndex}
        setTags={(newTags) => {
          if (onChange) onChange(newTags as Tag[]);
        }}
        styleClasses={mergedStyleClasses}
        tags={tags || []}
      />
    </div>
  );
}
