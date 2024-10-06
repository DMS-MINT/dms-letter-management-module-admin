import type { ReactNode } from "react";

import "../styles/loader.css";
import "../styles/svgBackground.css";
import "./globals.css";
// eslint-disable-next-line import/no-unresolved
import "/node_modules/flag-icons/css/flag-icons.min.css";

type RootLayoutProps = {
	children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout
// file is required, even if it's just passing children through.
export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}
