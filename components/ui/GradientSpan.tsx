import React, { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import {} from "@/utils";

const gradientSpanVariants = cva(
  "bg-gradient-to-r bg-clip-text text-transparent font-satoshi",
  {
    variants: {
      variant: {
        default: "from-amber-500 via-orange-600 to-yellow-500",
        orange_Grad: "from-amber-500 via-orange-600 to-yellow-500",
        green_Grad: "from-green-400 to-green-500",
        blue_Grad: "from-blue-600 to-cyan-600",
      },
      size: {
        default: "text-base md:text-lg lg:text-xl",
        xs : "text-xs",
        sm: "text-sm md:text-base",
        lg: "text-lg md:text-xl lg:text-2xl",
        xl: "text-xl md:text-2xl lg:text-3xl"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface GradientSpanProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientSpanVariants> {}

const GradientSpan = forwardRef<HTMLSpanElement, GradientSpanProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        {...props}
        className={gradientSpanVariants({variant, size, className })}
      >
        {children}
      </span>
    );
  }
);

GradientSpan.displayName = "GradientSpan";

export default GradientSpan;
