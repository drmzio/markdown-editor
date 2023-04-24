import { Extension } from '@tiptap/core'
import codemark from 'prosemirror-codemark'

import 'prosemirror-codemark/dist/codemark.css'

export const CodemarkExtension = Extension.create({
  name: 'CodemarkExtension',
  addProseMirrorPlugins() {
    return codemark({ markType: this.editor.schema.marks.code })
  },
})
