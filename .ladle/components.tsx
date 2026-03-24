import type { GlobalProvider } from "@ladle/react";
import "../src/app/globals.css";
import "./fonts.css";

export const Provider: GlobalProvider = ({ children }) => (
  <div style={{ fontFamily: "var(--family-body), sans-serif" }}>{children}</div>
);
