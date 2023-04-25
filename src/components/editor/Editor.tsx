import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditorContext } from '@/content/editor-context'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Typography from '@tiptap/extension-typography'
import { EditorContent, PureEditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { CodemarkExtension } from './extensions/CodemarkExtension'

const initialContent = [
  '<h1>The heading</h1>',
  '<p>For years parents have espoused the health <em>benefits</em> of eating <strong>garlic bread</strong> with cheese to their <code>children</code>, with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween.</p>',
  '<h2>What the science tells us</h2>',
  '<p>For years parents have espoused the health <em>benefits</em> of eating <strong>garlic bread</strong> with cheese to their children, with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween.</p>',
  '<h3>Garlic bread with cheese</h3>',
  '<p>But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.</p>',
  '<ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul>',
  '<p>But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.</p>',
  '<blockquote><p>Wow, that’s amazing. Good work, boy! 👏 <br>— Mom</p></blockquote>',
  '<p>But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.</p>',
  '<pre><code class="language-css">body {\n  display: none;\n}</code></pre>',
  '<p>But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.</p>',
]

const CustomDocument = Document.extend({
  /*content: 'heading block*',*/
})

export function Editor() {
  const editorRef = useRef<PureEditorContent>()
  const [nodeList, setNodeList] = useState<HTMLElement[]>([])
  const [editorContext, setEditorContext] = useEditorContext()
  const editor = useEditor({
    extensions: [
      CustomDocument,
      Highlight,
      Typography,
      CodemarkExtension,
      StarterKit.configure({ document: false }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          /*if (node.type.name === 'heading') {
            return 'Start writing'
          }*/
          // Placeholder on every new line
          return 'Start writing...'
        },
      }),
      CharacterCount,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-neutral max-w-full dark:prose-invert prose-md sm:prose-md lg:prose-lg xl:prose-lg mx-auto font-mono focus:outline-none min-h-screen',
      },
    },
    onCreate: ({ editor }) => {
      setEditorContext({
        type: 'SET_WORD_COUNT',
        payload: editor.storage.characterCount.words(),
      })
      setEditorContext({
        type: 'SET_CHAR_COUNT',
        payload: editor.storage.characterCount.characters(),
      })
      updateNodeList(editor.view.dom.childNodes)
    },
    onUpdate: ({ editor }) => {
      setEditorContext({
        type: 'SET_WORD_COUNT',
        payload: editor.storage.characterCount.words(),
      })
      setEditorContext({
        type: 'SET_CHAR_COUNT',
        payload: editor.storage.characterCount.characters(),
      })
      updateNodeList(editor.view.dom.childNodes)
    },
    content: initialContent.join(''),
  })

  const updateNodeList = useCallback((childNodes: NodeListOf<ChildNode>) => {
    let _childNodes = []
    childNodes.forEach((childNode) => {
      _childNodes.push(childNode)
    })
    setNodeList(_childNodes)
  }, [])

  useEffect(() => {
    if (!editor) return
    updateNodeList(editor.view.dom.childNodes)
  }, [editor])

  if (typeof window !== 'undefined') {
    window['__EDITOR__'] = editor
  }

  return (
    <div className="ui-editor relative">
      <EditorContent editor={editor} ref={editorRef} translate="no" />
      <EditorActions nodes={nodeList} />
    </div>
  )
}

type HeadingTags = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6'

interface EditorActionsProps {
  nodes: HTMLElement[]
}

export function EditorActions({ nodes }: EditorActionsProps) {
  const changeHeading = (node: HTMLElement, nodeName: string) => {
    console.log('-- changeHeading --', nodeName, node)
    const oldNode = node.cloneNode(true) as HTMLElement
    const newNode = document.createElement(nodeName) as HTMLElement
    newNode.innerHTML = oldNode.innerHTML
    node.replaceWith(newNode)
  }

  const renderActions = useCallback(() => {
    return nodes.map((node, index) => {
      let offsetTop = 0
      let offsetleft = 0
      switch (node.tagName) {
        case 'H1':
          offsetTop = 6
        case 'H2':
        case 'H3':
        case 'H4':
        case 'H5':
        case 'H6':
          return (
            <div
              key={index}
              className="absolute -ml-12"
              style={{
                /* prettier-ignore */
                top: (node.offsetTop + offsetTop),
                left: node.offsetLeft + offsetleft,
              }}
            >
              <HeadingAction
                tagName={node.tagName}
                onChange={(newTag) => changeHeading(node, newTag)}
              />
            </div>
          )
        default:
          return null
      }
    })
  }, [nodes])

  return <div className="ui-editor-actions">{renderActions()}</div>
}

interface HeadingActionProps {
  tagName: HeadingTags
  onChange?: (tagName: HeadingTags) => void
}

export function HeadingAction({ tagName, onChange }: HeadingActionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-neutral-400">
          {
            {
              H1: <Heading1 />,
              H2: <Heading2 />,
              H3: <Heading3 />,
              H4: <Heading4 />,
              H5: <Heading5 />,
              H6: <Heading6 />,
            }[tagName]
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={tagName === 'H1'}
            onClick={() => onChange('H1')}
          >
            <Heading1 className="mr-2 h-4 w-4" />
            <span>Heading 1</span>
            <DropdownMenuShortcut>⌘1</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={tagName === 'H2'}
            onClick={() => onChange('H2')}
          >
            <Heading2 className="mr-2 h-4 w-4" />
            <span>Heading 2</span>
            <DropdownMenuShortcut>⌘2</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={tagName === 'H3'}
            onClick={() => onChange('H3')}
          >
            <Heading3 className="mr-2 h-4 w-4" />
            <span>Heading 3</span>
            <DropdownMenuShortcut>⌘3</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={tagName === 'H4'}
            onClick={() => onChange('H4')}
          >
            <Heading4 className="mr-2 h-4 w-4" />
            <span>Heading 4</span>
            <DropdownMenuShortcut>⌘4</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={tagName === 'H5'}
            onClick={() => onChange('H5')}
          >
            <Heading5 className="mr-2 h-4 w-4" />
            <span>Heading 5</span>
            <DropdownMenuShortcut>⌘5</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={tagName === 'H6'}
            onClick={() => onChange('H6')}
          >
            <Heading6 className="mr-2 h-4 w-4" />
            <span>Heading 6</span>
            <DropdownMenuShortcut>⌘6</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
