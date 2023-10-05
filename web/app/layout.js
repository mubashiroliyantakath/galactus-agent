import './globals.css'
import { JetBrains_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
const jetbrains = JetBrains_Mono({subsets: ['latin']})
export const metadata = {
  title: 'Galactus Agent Dashboard',
  description: 'Dashboard on the target device',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrains.className}>
        {children}
        <Toaster/>
      </body>
    </html>
  )
}
