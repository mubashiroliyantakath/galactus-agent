import type { Metadata } from 'next'
import {inter} from "@/components/ui/fonts";
import './globals.css'
import {ThemeProvider} from "@/components/theme-provider"
import {ModeToggle} from "@/components/ui/dark-mode-button";



export const metadata: Metadata = {
  title: 'Galactus Agent Dashboard',
  description: 'Dashboard to configure the galactus agent locally...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
      <div className={`absolute top-0 right-0 h-16 w-16 mt-4`}>
          <ModeToggle/>
      </div>
      {children}
      </ThemeProvider>
      </body>
    </html>
  )
}
