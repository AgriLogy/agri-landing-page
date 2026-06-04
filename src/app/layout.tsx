import type React from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "./providers";
import { dirFor, type Locale } from "../i18n/config";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgriLogy — Smart Agriculture",
  description: "IoT-based irrigation & farm analytics that boost yields.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} dir={dirFor(locale)} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers locale={locale as Locale}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
