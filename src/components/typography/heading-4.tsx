import { type ReactNode, type HTMLAttributes } from "react";

import { cn } from "../../utils";

type TProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

const Heading4 = ({ className, children }: TProps) => {
  return (
    <h4 className={cn("text-xl font-bold tracking-tight leading-tight", className)}>
      {children}
    </h4>
  );
};

export default Heading4;
