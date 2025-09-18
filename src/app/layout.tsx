import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HB Legal Intelligence Platform',
  description: 'AI-Powered Document Intelligence for Legal Professionals',
  keywords: 'legal tech, document analysis, AI, contract review, Husch Blackwell',
  authors: [{ name: 'Kevin J. Andrews' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 antialiased">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}