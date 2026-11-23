type MonogramProps = {
  className?: string;
  /** Fill behind the mark — used on light surfaces and favicons. */
  background?: string;
};

/**
 * The VYUH MEDIA mark: a chiselled serif V above a fine antique-gold rule.
 * Drawn as vector paths so it stays crisp at any size.
 */
export function Monogram({ className, background }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {background ? (
        <rect width="64" height="64" fill={background} />
      ) : null}
      <path
        d="M12 13H24L32 36L40 13H52L36 51H28Z"
        fill="currentColor"
      />
      <rect x="18" y="55.5" width="28" height="1.6" fill="#a58b60" />
    </svg>
  );
}
