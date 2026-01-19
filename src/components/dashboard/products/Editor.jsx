import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export const Editor = ({setvalue, errors, initialContent}) => {

    const editor = useEditor({
        extensions: [StarterKit],
        content: initialContent || '',
        onUpdate: ({editor}) => {
            // Aqui actualizamos el valor del campo description.content en el formulario
            const content = editor.getJSON()
            setvalue('description', content, {shouldValidate: true})
        },
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[150px] prose prose-sm sm:prose-base '
            }
        }
    })

    useEffect(() => {
      if(initialContent && editor) {
        editor.commands.setContent(initialContent)
      }
    }, [initialContent, editor])
    

  return (
    <div className="space-y-3">
        <EditorContent editor={editor} />
         
        {
            errors.description && (
                <p className='text-red-500 text-xs mt-1'>
                    {errors.description.message || 'Debe escribir una descripción'}
                </p>
            )
        }
    </div>
  )
}