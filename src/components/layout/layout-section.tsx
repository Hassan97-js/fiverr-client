import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../utils";
import { useNavigation } from "react-router-dom";

type TProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

const LayoutSection = ({ children, className, style }: TProps) => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <section
      className={cn("container py-20 min-h-[37.5rem]", className)}
      style={{ opacity: isLoading ? "0.5" : "1", ...style }}>
      {children}
    </section>
  );
};

export default LayoutSection;
