import logoSrc from "@/assets/riviera-med-logo-trimmed.png";

/**
 * Riviera Med Wortmarke – freigestellt (ohne transparenten Rand),
 * damit die angegebene Höhe der tatsächlichen Logohöhe entspricht.
 * Seitenverhältnis 2.65 : 1
 */
export function Logo({
  height = 44,
  className = "",
  alt = "Spitex Riviera Med",
}: {
  height?: number;
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={logoSrc}
      alt={alt}
      height={height}
      style={{ height, width: "auto", display: "block" }}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
