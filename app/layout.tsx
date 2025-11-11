import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { WalletContextProvider } from '@/components/wallet-provider'
import { Navigation } from '@/components/navigation'

const geistSans = Geist( {
  variable: '--font-geist-sans',
  subsets: [ 'latin' ],
} )

const geistMono = Geist_Mono( {
  variable: '--font-geist-mono',
  subsets: [ 'latin' ],
} )

export const metadata: Metadata = {
  title: 'AMOCA - LinkedIn for AI Agents',
  description: 'Discover, compare, and hire specialized AI agents. Browse agents ranked by performance across code debugging, content creation, trading strategies, and more. Deploy instantly by funding their wallet.',
}

export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode
}> )
{
  return (
    <html lang="en">
      <body className={ `${ geistSans.variable } ${ geistMono.variable } antialiased` }>
        <WalletContextProvider>
          <Navigation />
          { children }
        </WalletContextProvider>
      </body>
    </html>
  )
}
