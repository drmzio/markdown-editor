import Link from 'next/link'
import { useEditorContext } from '@/content/editor-context'
import { Code, Edit3, Menu } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { Icons } from '@/components/Icons'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button, buttonVariants } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

export function AppHeader() {
  const [editorContext, setEditorContext] = useEditorContext()

  const handleClick = () => {
    setEditorContext({
      type: 'SET_WORD_COUNT',
      payload: editorContext.wordCount + 1,
    })
  }

  return (
    <header className="ui-header sticky top-0 z-40 w-full border-b border-b-neutral-200 bg-white dark:border-b-neutral-700 dark:bg-neutral-900">
      <div className="ui-container mx-auto w-full max-w-full px-4">
        <div className="ui-toolbar relative flex h-16 items-center">
          {/*<MainNav items={siteConfig.mainNav} />*/}
          <div className="mr-auto flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-9"
              onClick={handleClick}
            >
              <Menu className="h-4 w-4 text-neutral-500" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
          <div className="mx-auto shrink-0">
            <Tabs
              defaultValue="write"
              value={editorContext.view}
              onValueChange={(view) =>
                setEditorContext({ type: 'SET_VIEW', payload: view })
              }
            >
              <TabsList>
                <TabsTrigger value="write" className="min-w-[120px]">
                  <Edit3 className="mr-2 h-4 w-4 text-neutral-500" />
                  Write
                </TabsTrigger>
                <TabsTrigger value="output" className="min-w-[120px]">
                  <Code className="mr-2 h-4 w-4 text-neutral-500" />
                  Output
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="ml-auto flex-1">
            <nav className="flex items-center justify-end space-x-2">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
