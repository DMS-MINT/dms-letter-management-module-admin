import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import NotFoundClient from "@/components/screen/NotFoundClient";
import { ThemeProvider } from "@/providers/theme-provider";

export default async function NotFound() {
	// Fetch messages on the server side
	const messages = await getMessages();

	return (
		<html lang="en">
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NextIntlClientProvider messages={messages}>
						<NotFoundClient />;
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
