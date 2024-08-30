import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { ClerkProvider } from '@clerk/nextjs'
import { TRPCReactProvider } from '@/trpc/clients/client'
import { Container } from '@/components/ui/container'
import { Navbar } from '@/components/organisms/Navbar'
import { Toaster } from '@/components/molecules/toaster/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ticketed',
  description: 'Book Your Movies!!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <html lang="en">
          <body className={inter.className}>
            <Toaster />
            <Navbar />
            <Container>{children}</Container>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  )
}
