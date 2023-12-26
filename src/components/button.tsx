import { type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "../utils/cn";

type ButtonVariants =
  | "default"
  | "primary"
  | "primary-outline"
  | "secondary"
  | "secondary-outline"
  | "danger";

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
  ...otherProps
}: TProps) => {
  return (
    <button
      className={cn(
        "text-center text-base font-medium rounded-lg px-[1.4em] py-[0.6em] focus:outline-none transition border-none hover:bg-none",
        size === "sm" && "text-sm",
        size === "xs" && "text-xs",
        shape === "sharp" && "rounded-none",
        variant === "primary" &&
          "bg-green-700 text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 disabled:bg-green-400",
        {
          "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 disabled:bg-green-400 disabled:text-green-400":
            variant === "primary-outline",
          "bg-neutral-700 text-white hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-300 disabled:bg-neutral-400":
            variant === "secondary",
          "text-neutral-700 hover:text-white border border-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-300 disabled:bg-neutral-400 disabled:text-neutral-400":
            variant === "secondary-outline",
          "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 disabled:bg-red-400":
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
