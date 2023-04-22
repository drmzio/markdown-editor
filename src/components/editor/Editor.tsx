import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import { useEditorContext } from '@/content/editor-context'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
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

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
  content: 'heading block*',
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
      StarterKit.configure({ document: false }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Start writing'
          }
          // Placeholder on every new line
          return 'Write something...'
        },
      }),
      CharacterCount.configure(),
    ],
    editorProps: {
      attributes: {
        class:
          'prose max-w-full dark:prose-invert prose-md sm:prose-md lg:prose-lg xl:prose-lg mx-auto font-mono focus:outline-none min-h-screen',
      },
    },
    onCreate: ({ editor }) => {
      updateNodeList(editor.view.dom.childNodes)
      setEditorContext({
        type: 'SET_WORD_COUNT',
        payload: editor.storage.characterCount.words(),
      })
      setEditorContext({
        type: 'SET_CHAR_COUNT',
        payload: editor.storage.characterCount.characters(),
      })
    },
    onUpdate: ({ editor }) => {
      updateNodeList(editor.view.dom.childNodes)
      setEditorContext({
        type: 'SET_WORD_COUNT',
        payload: editor.storage.characterCount.words(),
      })
      setEditorContext({
        type: 'SET_CHAR_COUNT',
        payload: editor.storage.characterCount.characters(),
      })
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
  function handleChangeHeading(node, nodeName) {
    const oldNode = node.cloneNode(true) as HTMLElement
    const newNode = document.createElement(nodeName) as HTMLElement
    newNode.innerHTML = oldNode.innerHTML
    node.replaceWith(newNode)
  }

  return (
    <div className="ui-editor-actions">
      {nodes.map((node, index) => {
        switch (node.tagName) {
          case 'H1':
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
                  top: node.offsetTop,
                  left: node.offsetLeft,
                }}
              >
                <EditorActionHeading
                  node={node}
                  onChange={handleChangeHeading}
                />
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

interface EditorActionHeadingProps {
  node: HTMLElement
  onChange?: (node: HTMLElement, tagName: HeadingTags) => void
}

export function EditorActionHeading({
  node,
  onChange,
}: EditorActionHeadingProps) {
  const updateNode = (nodeName: HeadingTags) => {
    onChange(node, nodeName)
  }

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
            }[node.tagName]
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={node.tagName === 'H1'}
            onClick={() => updateNode('H2')}
          >
            <Heading1 className="mr-2 h-4 w-4" />
            <span>Heading 1</span>
            <DropdownMenuShortcut>⌘1</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={node.tagName === 'H2'}
            onClick={() => updateNode('H2')}
          >
            <Heading2 className="mr-2 h-4 w-4" />
            <span>Heading 2</span>
            <DropdownMenuShortcut>⌘2</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={node.tagName === 'H3'}
            onClick={() => updateNode('H3')}
          >
            <Heading3 className="mr-2 h-4 w-4" />
            <span>Heading 3</span>
            <DropdownMenuShortcut>⌘3</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Heading4 className="mr-2 h-4 w-4" />
            <span>Heading 4</span>
            <DropdownMenuShortcut>⌘4</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Heading5 className="mr-2 h-4 w-4" />
            <span>Heading 5</span>
            <DropdownMenuShortcut>⌘5</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Heading6 className="mr-2 h-4 w-4" />
            <span>Heading 6</span>
            <DropdownMenuShortcut>⌘6</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
