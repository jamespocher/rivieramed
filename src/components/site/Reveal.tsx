import { useReveal } from "@/hooks/use-reveal";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "zoom" | "left" | "right";
};

export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  variant = "up",
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      data-revealed={revealed ? "true" : "false"}
      data-reveal={variant}
      style={{ transitionDelay: `${delay}ms` }}
      className={`rm-reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
