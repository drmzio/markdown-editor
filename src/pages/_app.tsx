import type { AppProps } from 'next/app'
import { EditorContextProvider } from '@/content/editor-context'
import { IBM_Plex_Mono as FontMono, Inter as FontSans } from '@next/font/google'
import { ThemeProvider } from 'next-themes'

import '@/styles/globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
          --font-mono: ${fontMono.style.fontFamily};
        }
      `}</style>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <EditorContextProvider>
          <Component {...pageProps} />
        </EditorContextProvider>
      </ThemeProvider>
    </>
  )
}
