import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors",
  {
    variants: {
      variant: {
        filled:
          "bg-blue-700 text-primary-foreground hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:hover:bg-blue-700 disabled:bg-blue/[.70]",
        outline:
          "border text-gray-600 border-input bg-background hover:bg-accent hover:text-gray-foreground focus:ring-1 focus:outline-none focus:border-blue-200 focus:ring-blue-200 focus:hover:bg-background disabled:bg-accent/[.20] disabled:text-gray-600/[.20]",
        link: "text-blue-700 hover:bg-blue-100 focus:ring-1 focus:outline-none focus:border-blue-200 focus:ring-blue-200 focus:hover:bg-white disabled:text-gray-300 disabled:bg-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "sm",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
