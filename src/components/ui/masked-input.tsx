"use client";

import { Replacement, useMask } from "@react-input/mask";
import { forwardRef } from "react";
import { Input, type InputProps } from "./input";

interface MaskedInputProps extends InputProps {
  mask: string;
  replacement: Replacement;
}

function mergeRefs<T>(...refs: React.Ref<T>[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && "current" in ref) {
        // Now TypeScript knows ref is a RefObject with a writable current property
        ref.current = node;
      }
    });
  };
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, replacement, ...props }, forwardedRef) => {
    const maskRef = useMask({ mask, replacement }); // returns { current: null }
    const mergedRef = mergeRefs(maskRef, forwardedRef);

    return <Input ref={mergedRef} {...props} />;
  },
);

MaskedInput.displayName = "MaskedInput";
