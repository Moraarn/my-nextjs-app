// Mark this file as a client-side component
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Home
      </Link>
      <Link
        href="/classes"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/classes" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Classes
      </Link>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/teacher"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/teacher" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Teacher Portal
      </Link>
    </nav>
  );
}
