import { useEditorContext } from '@/content/editor-context'

export function AppFooter() {
  const [editorContext] = useEditorContext()

  return (
    <header className="ui-footer sticky bottom-0 z-40 w-full border-t border-t-neutral-200 bg-white dark:border-t-neutral-700 dark:bg-neutral-900">
      <div className="ui-container mx-auto w-full max-w-full px-4">
        <div className="ui-toolbar flex h-8 items-center">
          <div className="mr-auto flex-1">
            <ul className="flex space-x-3 text-xs text-neutral-500 dark:text-neutral-400">
              <li>
                <code className="text-neutral-700 dark:text-neutral-300">
                  {editorContext.wordCount}
                </code>
                {` words`}
              </li>
              <li>
                <code className="text-neutral-700 dark:text-neutral-300">
                  {editorContext.charCount}
                </code>
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
