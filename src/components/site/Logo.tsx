import logoSrc from "@/assets/riviera-med-logo.png";

/**
 * Riviera Med brand logo — official uploaded asset.
 * The image already contains the wordmark "SPITEX RIVIERA MED".
 */
export function Logo({
  height = 40,
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
