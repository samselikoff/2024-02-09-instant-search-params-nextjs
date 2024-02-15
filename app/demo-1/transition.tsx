"use client";

import { ReactNode } from "react";
import { useGlobalState } from "./genres-panel";

export default function Transition({
  className,
  pendingClassName,
  children,
}: {
  className: string;
  pendingClassName: string;
  children: ReactNode;
}) {
  let [pending] = useGlobalState("pending");

  return (
    <div className={`${pending ? pendingClassName : ""} ${className}`}>
      {children}
    </div>
  );
}
