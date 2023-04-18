import { useEditorContext } from '@/content/editor-context'

export function AppFooter() {
  const [editorContext] = useEditorContext()

  return (
    <header className="ui-footer sticky bottom-0 z-40 w-full border-t border-t-neutral-200 bg-white dark:border-t-neutral-700 dark:bg-neutral-900">
      <div className="ui-container mx-auto w-full max-w-full px-4">
        <div className="ui-toolbar flex h-8 items-center">
          <div className="mr-auto flex-1">
            <ul className="dark:text-neutral-40 flex space-x-3 text-sm text-neutral-500">
              <li>
                <code>{editorContext.wordCount}</code>
                {` words`}
              </li>
              <li>
                <code>{editorContext.charCount}</code>
                {` characters`}
              </li>
            </ul>
          </div>
          <div className="mx-auto shrink-0">&nbsp;</div>
          <div className="ml-auto flex-1">&nbsp;</div>
        </div>
      </div>
    </header>
  )
}
