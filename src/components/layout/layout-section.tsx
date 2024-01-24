import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../utils";
import { useNavigation } from "react-router-dom";

type TProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  hasLoading?: boolean;
};

const LayoutSection = ({ children, className, style, hasLoading = true }: TProps) => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading" && hasLoading;

  return (
    <section
      className={cn("container py-20 min-h-[1000px]", className)}
      style={{ opacity: isLoading ? "0.5" : "1", ...style }}>
      {children}
    </section>
  );
};

export const Section = ({ children, className, style }: TProps) => {
  return (
    <section className={cn("container py-20 min-h-[1000px]", className)} style={style}>
      {children}
    </section>
  );
};

export default LayoutSection;
