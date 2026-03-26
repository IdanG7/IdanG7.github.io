"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, MouseEvent, useCallback, useRef } from "react";
import { scrollToTopInstant, applyTransitionAnimation } from "@/components/ViewTransitionHandler";

type TransitionLinkProps = ComponentProps<typeof Link> & {
  /** Use reverse (closing) animation — for "back" style links */
  back?: boolean;
};

export default function TransitionLink({
  href,
  onClick,
  children,
  back = false,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const resolveRef = useRef<(() => void) | null>(null);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      e.preventDefault();

      const url = typeof href === "string" ? href : href.pathname || "/";

      // No View Transitions API — just navigate and scroll
      if (!document.startViewTransition) {
        router.push(url, { scroll: false });
        requestAnimationFrame(() => scrollToTopInstant());
        return;
      }

      const transition = document.startViewTransition(() => {
        return new Promise<void>((resolve) => {
          resolveRef.current = resolve;
          router.push(url, { scroll: false });

          setTimeout(() => {
            if (resolveRef.current === resolve) {
              resolve();
              resolveRef.current = null;
            }
          }, 500);
        });
      });

      // Apply correct animation direction via Web Animations API
      applyTransitionAnimation(transition, back ? "back" : "forward");
    },
    [href, onClick, router, back]
  );

  return (
    <Link href={href} onClick={handleClick} scroll={false} {...props}>
      {children}
    </Link>
  );
}
