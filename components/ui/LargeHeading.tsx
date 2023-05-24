import React, { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils";

const largeHeadingVariants = cva(
  "font-bold leading-tight tracking-tighter",
  {
    variants: {
      variant: {
        default: "text-black",
        gray : "text-gray-600",
        blue_grad : "bg-gradient-to-r bg-clip-text text-transparent from-blue-600 to-cyan-600",
        orange_grad : "bg-gradient-to-r bg-clip-text text-transparent from-amber-500 via-orange-600 to-yellow-500"
      },
      size: {
        default: "text-xl md:text-2xl lg:text-3xl",
        md : "text-base",
        lg: "text-lg md:text-xl lg:text-2xl",
        xl: "text-2xl md:text-3xl lg:text-4xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface LargeHeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof largeHeadingVariants> {}

const LargeHeading = forwardRef<HTMLHeadingElement, LargeHeadingProps>(
  ({ className, size, variant, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(largeHeadingVariants({ size, variant, className }))}
      >
        {children}
      </h1>
    );
  }
);

LargeHeading.displayName = "LargeHeading";

export default LargeHeading;
