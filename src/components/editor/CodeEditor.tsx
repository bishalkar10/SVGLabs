import React, { useCallback } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { xml } from "@codemirror/lang-xml";
import classes from "@/components/editor/CodeEditor.module.css";

interface CodeEditorProps {
  code: string;
  onValueChange: (code: string) => void;
  language?: string;
  placeholder?: string;
  className?: string;
  onFormat?: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onValueChange,
  placeholder,
  className = "",
  onFormat,
}) => {
  const onChange = useCallback((val: string) => {
    onValueChange(val);
  }, [onValueChange]);

  const extensions = [xml()];

  return (
    <div className={classes.container}>
      {onFormat && (
        <button 
          className={classes.formatBtn} 
          onClick={onFormat}
          title="Format Code"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <use href="/spritesheet.svg#icon-format" />
          </svg>
        </button>
      )}
      <ReactCodeMirror
        value={code}
        height="100%"
        className={`${classes.editorLayout} ${className}`}
        extensions={extensions}
        onChange={onChange}
        theme="dark"
        placeholder={placeholder}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
        }}
        style={{ fontSize: "14px", fontFamily: '"Fira Code", "Fira Mono", monospace' }}
      />
    </div>
  );
};

export default CodeEditor;
