import Head from 'next/head'

import { Editor } from '@/components/editor'
import { SiteHeader } from '@/components/site-header'

export default function IndexPage() {
  return (
    <div className="relative flex h-screen max-h-full min-h-full flex-col">
      <Head>
        <title>Markdown Editor</title>
        <meta name="description" content="Just a fancy markdown editor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SiteHeader />
      <main id="main-content" className="h-full flex-1 overflow-y-auto py-12">
        <div className="ui-container mx-auto w-full max-w-2xl px-4">
          <Editor />
        </div>
      </main>
    </div>
  )
}
