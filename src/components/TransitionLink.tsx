"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ComponentProps, MouseEvent, useCallback, useEffect, useRef } from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

export default function TransitionLink({
  href,
  onClick,
  children,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const resolveRef = useRef<(() => void) | null>(null);

  // When pathname changes, resolve any pending transition
  useEffect(() => {
    if (resolveRef.current) {
      resolveRef.current();
      resolveRef.current = null;
    }
  }, [pathname]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Call original onClick if provided
      onClick?.(e);

      // If default was prevented, don't do our transition
      if (e.defaultPrevented) return;

      // Check if View Transitions API is supported
      if (!document.startViewTransition) {
        return; // Let normal navigation happen
      }

      // Prevent default navigation
      e.preventDefault();

      // Get the href as string
      const url = typeof href === "string" ? href : href.pathname || "/";

      // Start view transition
      document.startViewTransition(() => {
        return new Promise<void>((resolve) => {
          resolveRef.current = resolve;
          router.push(url);

          // Fallback timeout in case pathname doesn't change (same page nav)
          setTimeout(() => {
            if (resolveRef.current === resolve) {
              resolve();
              resolveRef.current = null;
            }
          }, 500);
        });
      });
    },
    [href, onClick, router]
  );

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
