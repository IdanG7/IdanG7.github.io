"use client";

/**
 * PageTransition wrapper - View Transitions are now handled natively
 * by Next.js via the viewTransition config option. This component
 * is kept as a simple wrapper for backwards compatibility.
 *
 * The actual transition animations are defined in globals.css using
 * the ::view-transition-old and ::view-transition-new pseudo-elements.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
