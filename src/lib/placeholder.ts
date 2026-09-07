/**
 * Placeholder detection.
 *
 * Phase 1 ships with bracketed placeholders instead of invented personal
 * information. The UI needs to tell the difference so it can render a
 * clearly-marked, inert chip rather than, say, a broken `mailto:` link.
 *
 * Convention: a value wrapped in square brackets is a placeholder.
 */
const PLACEHOLDER_PATTERN = /^\s*\[[\s\S]*\]\s*$/;

export function isPlaceholder(value: string | undefined | null): boolean {
  return typeof value === "string" && PLACEHOLDER_PATTERN.test(value);
}

/** Returns the value only when it is real content, otherwise `undefined`. */
export function realValue(value: string | undefined | null): string | undefined {
  if (!value || isPlaceholder(value)) return undefined;
  return value;
}

/** Builds an `href` from a content value, or `undefined` if it is a placeholder. */
export function resolveHref(
  value: string | undefined | null,
  kind: "url" | "email" = "url",
): string | undefined {
  const real = realValue(value);
  if (!real) return undefined;
  return kind === "email" ? `mailto:${real}` : real;
}
