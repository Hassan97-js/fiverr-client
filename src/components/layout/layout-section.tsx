import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

const LayoutSection = ({ children, className }: Props) => {
  return (
    <section className={cn("container py-20 min-h-[37.5rem]", className)}>
      {children}
    </section>
  );
};

export default LayoutSection;
