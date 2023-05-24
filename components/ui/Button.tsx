import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, forwardRef } from "react";
import { Loader2 } from "lucide-react";

export const buttonVariants = cva(
  "active:scale-95 font-inter inline-flex items-center justify-center rounded-md text-xs sm:text-sm font-medium transition-color duration-200 disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-white hover:bg-gray-700",
        outline: "border border-gray-300 text-dark hover:border-gray-200",
        ghost: "bg-gray-200 hover:bg-gray-100",
        link: "bg-transparent underline-offset-4 hover:underline text-dark hover:bg-transparent",
        gradient : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90"
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
        ref={ref}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
