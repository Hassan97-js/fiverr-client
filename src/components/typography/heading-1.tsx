import { type ReactNode, type HTMLAttributes } from "react";

import { cn } from "../../utils";

type TProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

const Heading1 = ({ className, children }: TProps) => {
  return (
    <h1
      className={cn(
        "font-bold xl:text-6xl sm:text-5xl text-4xl tracking-tight",
        className
      )}>
      {children}
    </h1>
  );
};

export default Heading1;
