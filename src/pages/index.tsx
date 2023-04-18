import Head from 'next/head'
import { useEditorContext } from '@/content/editor-context'
import * as Tabs from '@radix-ui/react-tabs'

import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'
import { Editor } from '@/components/editor/Editor'

export default function IndexPage() {
  const [editorContext] = useEditorContext()

  return (
    <div className="relative flex h-screen max-h-full min-h-full flex-col">
      <Head>
        <title>Markdown Editor</title>
        <meta name="description" content="Just a fancy markdown editor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <main
        id="main-content"
        className="relative h-full flex-1 overflow-y-auto py-12"
      >
        <div className="ui-container mx-auto w-full max-w-3xl px-4">
          <Tabs.Root value={editorContext.view}>
            <Tabs.Content value="write">
              <Editor />
            </Tabs.Content>
            <Tabs.Content value="output">OUTPUT</Tabs.Content>
          </Tabs.Root>
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
