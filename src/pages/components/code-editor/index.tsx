import React, { FC, useCallback } from "react";
import Editor from "@monaco-editor/react";

interface ICodeEditorProps  {
  value: string,
  onChange: (value: string) => void
}

const CodeEditor: FC<ICodeEditorProps> = (props) => {
  const { value, onChange } = props

  const handleCodeChange = useCallback((value) => {
    onChange(value)
  }, [onChange])

  return (
   <Editor
     height="60vh"
     defaultLanguage="javascript"
     value={value}
     onChange={handleCodeChange}
   />
  );
}

export default CodeEditor
