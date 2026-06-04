// app/providers.tsx
'use client'

import { useMemo } from 'react'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { dirFor, type Locale } from '../i18n/config'


const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}
const theme = extendTheme({
  config,
  colors: {
    green: {
      50: "#f0fff4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
  },
  fonts: {
    heading: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  styles: {
    global: {
      "h1, h2, h3, h4": { letterSpacing: "-0.02em" },
    },
  },
  radii: {
    card: "1rem",
    button: "0.75rem",
  },
  shadows: {
    card: "0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)",
    "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.06)",
  },
})

export function Providers({
  children,
  locale = 'fr',
}: {
  children: React.ReactNode
  locale?: Locale
}) {
  const dir = dirFor(locale)
  const dirTheme = useMemo(() => ({ ...theme, direction: dir }), [dir])

  return <ChakraProvider theme={dirTheme}>{children}</ChakraProvider>
}