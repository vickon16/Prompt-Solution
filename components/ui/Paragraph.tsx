import React, { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import {} from "@/utils";

const paragraphVariants = cva(
  "max-w-prose text-gray-600",
  {
    variants: {
      variant: {
        default: "",
        desc : "mt-5",
        logo : "text-black tracking-wide font-semibold font-satoshi",
        gray: "text-gray-500",
        blue_grad : "bg-gradient-to-r bg-clip-text from-blue-600 to-cyan-600"
      },
      size: {
        default: "text-base sm:text-lg",
        xs: "text-xs",
        sm: "text-sm sm:text-base",
        lg : "text-lg sm:text-xl"
      },
    },
    defaultVariants: {
      variant : "default",
      size: "default",
    },
  }
);

interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, variant, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        {...props}
        className={paragraphVariants({variant, size, className })}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
