"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";

export const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return ReactDOM.createPortal(children, document.body);
};
