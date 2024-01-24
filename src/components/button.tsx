import { type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "../utils";

type ButtonVariants = "default" | "primary" | "primary-outline" | "secondary" | "secondary-outline" | "danger";

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: "default" | "sm" | "xs";
  shape?: "default" | "sharp";
  variant?: ButtonVariants;
};

const Button = ({
  children,
  onClick,
  className,
  size = "default",
  shape = "default",
  variant = "default",
  disabled,
  ...otherProps
}: TProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center select-none no-underline font-poppins text-inherit text-center text-base font-medium rounded-lg px-[1.4em] py-[0.6em] focus-visible:outline-none transition hover:bg-none touch-manipulation cursor-pointer",
        size === "sm" && "text-sm",
        size === "xs" && "text-xs",
        shape === "sharp" && "rounded-none",
        {
          "focus-visible:ring-4 focus-visible:ring-green-300": variant === "default",
          "cursor-auto opacity-70 pointer-events-none": disabled,
          "bg-green-700 text-white hover:bg-green-800 focus-visible:ring-4 focus-visible:ring-green-300 disabled:bg-green-400":
            variant === "primary",
          "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus-visible:ring-4 focus-visible:ring-green-300 disabled:bg-green-400 disabled:text-green-400":
            variant === "primary-outline",
          "bg-zinc-700 text-white hover:bg-zinc-800 focus-visible:ring-4 focus-visible:ring-zinc-300 disabled:bg-zinc-400":
            variant === "secondary",
          "text-zinc-700 hover:text-white border border-zinc-700 hover:bg-zinc-800 focus-visible:ring-4 focus-visible:ring-zinc-300 disabled:bg-zinc-400 disabled:text-zinc-400":
            variant === "secondary-outline",
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-4 focus-visible:ring-red-300 disabled:bg-red-400":
            variant === "danger"
        },
        className
      )}
      {...otherProps}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
