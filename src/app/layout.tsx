import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KinderDeutsch - Online German Learning for Kids',
  description: 'Interactive German lessons for children',
  keywords: 'german, learning, children, online classes, language learning',
  authors: [{ name: 'KinderDeutsch' }],
  openGraph: {
    title: 'KinderDeutsch - Online German Learning for Kids',
    description: 'Interactive German lessons for children',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col bg-background">
            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_800px_at_100%_200px,#4F46E515,transparent)]" />
            
            <SiteHeader />
            
            <AnimatePresence mode="wait">
              <motion.main 
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.main>
            </AnimatePresence>

            <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container py-6 flex items-center justify-between text-sm text-muted-foreground">
                <p>© 2024 KinderDeutsch. All rights reserved.</p>
                <nav className="flex gap-4">
                  <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
                  <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
                  <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
                </nav>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}