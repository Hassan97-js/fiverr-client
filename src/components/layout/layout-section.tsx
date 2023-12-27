import { type ReactNode } from "react";

import { cn } from "../../utils";

type TProps = {
  children: ReactNode;
  className?: string;
};

const LayoutSection = ({ children, className }: TProps) => {
  return (
    <section className={cn("container py-20 min-h-[37.5rem]", className)}>
      {children}
    </section>
  );
};

export default LayoutSection;
