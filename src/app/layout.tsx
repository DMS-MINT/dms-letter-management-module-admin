import type { ReactNode } from "react";

import "../styles/loader.css";
import "./globals.css";

type RootLayoutProps = {
	children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout
// file is required, even if it's just passing children through.
export default function RootLayout({ children }: RootLayoutProps) {
	return children;
}
