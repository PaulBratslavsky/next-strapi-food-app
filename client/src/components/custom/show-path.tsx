"use client";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

function makeHumanReadable(pathname: string) {
  return pathname.replace("/", "").replace("-", " ");
}

export function ShowPath() {
  const pathname = usePathname();
  const path = makeHumanReadable(pathname);
  
  if (path === "") return null;

  return (
    <Fragment>
      <span className="text-muted-foreground">/</span>
      <p className="text-2xl md:text-3xl font-bold text-muted-foreground">
        {path}
      </p>
    </Fragment>
  );
}
