import type { ReactNode } from "react";

import { GeneralShell } from "@/components/shared/Wrappers/GeneralShell";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return <GeneralShell>{children}</GeneralShell>;
}
