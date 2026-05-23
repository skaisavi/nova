import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-[0_0_40px_rgba(139,233,255,0.2)] hover:bg-primary/90",
        secondary: "glass-surface text-foreground hover:border-white/20 hover:bg-white/10",
        ghost: "text-muted-foreground hover:bg-white/[0.08] hover:text-foreground",
        danger: "bg-destructive/15 text-destructive hover:bg-destructive/25"
      },
      size: {
        sm: "min-h-9 px-4 text-xs",
        md: "min-h-11 px-5",
        lg: "min-h-12 px-6 text-base",
        icon: "size-11 px-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { buttonVariants };
