import * as React from "react";

import { cn } from "@/lib/utils";

interface SiteShellProps extends React.HTMLAttributes<HTMLDivElement> {}

const SiteShell = ({ children, className, ...props }: SiteShellProps) => {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  );
};

export default SiteShell;
