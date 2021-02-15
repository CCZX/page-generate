import React, { FC, useCallback } from "react";
import Editor, { EditorProps } from "@monaco-editor/react";

interface ICodeEditorProps  {
  value: string,
  onChange: (value: string) => void
  language?: string
}

const CodeEditor: FC<ICodeEditorProps> = (props) => {
  const { value, onChange, language = 'javascript' } = props

  const handleCodeChange = useCallback((value) => {
    onChange(value)
  }, [onChange])

  return (
   <Editor
     height="60vh"
     language={language}
     value={value}
     onChange={handleCodeChange}
     options={{
       fontSize: 14,
       tabSize: 2,
     }}
   />
  );
}

export default CodeEditor
