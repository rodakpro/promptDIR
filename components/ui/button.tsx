import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white shadow-glow hover:brightness-105",
        secondary:
          "border border-border-soft bg-panel text-foreground shadow-soft hover:bg-panel-soft",
        ghost: "text-muted hover:bg-panel-soft hover:text-foreground",
        outline:
          "border border-border-soft bg-transparent text-foreground hover:bg-panel-soft"
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
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
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
