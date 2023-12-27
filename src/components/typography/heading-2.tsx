import { type ReactNode, type HTMLAttributes } from "react";

import { cn } from "../../utils";

type TProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

const Heading2 = ({ className, children }: TProps) => {
  return (
    <h2 className={cn("text-3xl font-bold leading-tight tracking-tight", className)}>
      {children}
    </h2>
  );
};

export default Heading2;
