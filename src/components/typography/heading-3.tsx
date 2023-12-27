import { type ReactNode, type HTMLAttributes } from "react";

import { cn } from "../../utils";

type TProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

const Heading3 = ({ className, children }: TProps) => {
  return (
    <h3 className={cn("text-2xl font-bold tracking-tight leading-tight", className)}>
      {children}
    </h3>
  );
};

export default Heading3;
