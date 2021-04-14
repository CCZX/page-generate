import React, { FC, useCallback } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import customLib from './custom-lib/index'

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

  const handleEditorMount = useCallback((editor, monaco) => {
    console.log(editor, monaco)
    monaco.languages.typescript.javascriptDefaults.addExtraLib(customLib, 'customLib.js');
  }, [])

  return (
   <Editor
     height="60vh"
     language={language}
     value={value}
     onChange={handleCodeChange}
     onMount={handleEditorMount}
     options={{
       fontSize: 14,
       tabSize: 2,
     }}
   />
  );
}

export default CodeEditor
