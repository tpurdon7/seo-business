import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold outline-none transition duration-200 focus-visible:ring-4 focus-visible:ring-orange-300/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-orange-600 text-white shadow-[0_16px_32px_rgba(234,88,12,0.24)] hover:bg-orange-500",
        secondary:
          "border border-slate-200 bg-white text-slate-950 shadow-sm hover:border-slate-300 hover:bg-slate-50",
        dark: "bg-slate-950 text-white shadow-[0_16px_32px_rgba(2,6,23,0.24)] hover:bg-slate-800",
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
