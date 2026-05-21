import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'Porra Mundial 2026',
  description: 'Gestion de porra del Mundial 2026',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
