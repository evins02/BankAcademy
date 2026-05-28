import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[#0D1B4B] text-white hover:bg-[#0a1640] dark:bg-[#00C9B1] dark:text-[#0D1B4B] dark:hover:bg-[#00b5a0]",
        secondary:
          "border border-border bg-surface text-text-primary hover:bg-gray-50",
        ghost: "text-text-secondary hover:bg-gray-100 hover:text-text-primary",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "rounded-pill px-3 py-1.5 text-xs",
        md: "rounded-pill px-5 py-2",
        lg: "rounded-pill px-6 py-3 text-base",
        icon: "h-9 w-9 rounded-DEFAULT",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
