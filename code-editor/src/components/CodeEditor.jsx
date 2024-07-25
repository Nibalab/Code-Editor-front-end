import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div style={styles.wrapper}>
    <div style={styles.container}>
      <div style={styles.editorContainer}>
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          options={{
            minimap: {
              enabled: false,
            },
          }}
          height="75vh"
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
      <Output editorRef={editorRef} language={language} />
    </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '16px',
  },
  editorContainer: {
    width: '50%',
  },

  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#0f0a19', 
    color: '#dcdcdc', 
    padding: '32px 24px',
  }  
};

export default CodeEditor;
