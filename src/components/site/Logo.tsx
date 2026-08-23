import logoFarbe from "@/assets/riviera-med-logo-trimmed.png";
import logoWeiss from "@/assets/riviera-med-logo-weiss.png";

/**
 * Riviera Med Wortmarke – freigestellt (ohne transparenten Rand),
 * damit die angegebene Höhe der tatsächlichen Logohöhe entspricht.
 *
 * variant="weiss" für dunkle Flächen (Fusszeile), sonst die Farbversion.
 */
export function Logo({
  height = 44,
  className = "",
  alt = "Spitex Riviera Med",
  variant = "farbe",
}: {
  height?: number;
  className?: string;
  alt?: string;
  variant?: "farbe" | "weiss";
}) {
  return (
    <img
      src={variant === "weiss" ? logoWeiss : logoFarbe}
      alt={alt}
      height={height}
      style={{ height, width: "auto", display: "block" }}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
