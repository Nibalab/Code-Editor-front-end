import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import axios from 'axios';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const saveCode = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/codes', {
        title: title,
        description: description,
        code: value,
        language: language
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, 
      });

      console.log('Code saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving code:', error);
    }
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
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={saveCode}>Save</button>
          </div>
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
