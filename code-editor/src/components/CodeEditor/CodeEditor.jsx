import { useRef, useState, useEffect, useCallback } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "../LanguageSelector";
import { CODE_SNIPPETS } from "../../constants";
import Output from "../Output";
import axios from 'axios';
import './CodeEditor.css';
import { Link } from "react-router-dom";

const CodeEditor = () => {
  const editorRef = useRef();
  const suggestionWidgetRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [lastLineNumber, setLastLineNumber] = useState(0);
  const suggestionCache = useRef({});
  const abortControllerRef = useRef(null);

  const fetchSuggestions = async (prompt, lang, task = 'completion') => {
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    const cacheKey = `${prompt}_${lang}_${task}`;
    if (suggestionCache.current[cacheKey]) {
        return suggestionCache.current[cacheKey];
    }

    try {
        const response = await axios.post('http://localhost:8000/api/get-suggestions', {
            prompt,
            language: lang,
            task,
        }, {
            signal: abortControllerRef.current.signal,
        });

        console.log('API response:', response.data);
        const suggestionList = response.data.choices[0].message.content.split('\n').map(line => line.trim()).filter(line => line);
        suggestionCache.current[cacheKey] = suggestionList;
        return suggestionList;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Fetch request was cancelled.');
        } else {
            console.error('Error fetching code suggestions:', error);
        }
        return [];
    }
};


  const showSuggestionWidget = (editor, suggestion) => {
    hideSuggestionWidget();

    const domNode = document.createElement('div');
    domNode.className = 'suggestion-widget';
    domNode.style.position = 'absolute';
    domNode.style.backgroundColor = '#1e1e1e';
    domNode.style.color = '#ffffff';
    domNode.style.padding = '5px';
    domNode.style.borderRadius = '4px';
    domNode.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';
    domNode.innerText = suggestion;

    const editorDom = editor.getDomNode();
    if (editorDom) {
      editorDom.appendChild(domNode);
    }

    const position = editor.getPosition();
    if (!position) {
      console.error('Editor position is null.');
      return;
    }

    const { lineNumber, column } = position;
    const coords = editor.getScrolledVisiblePosition({ lineNumber, column });
    if (coords) {
      domNode.style.top = `${coords.top + coords.height}px`;
      domNode.style.left = `${coords.left}px`;
    }

    suggestionWidgetRef.current = domNode;
  };

  const hideSuggestionWidget = () => {
    if (suggestionWidgetRef.current && suggestionWidgetRef.current.parentNode) {
      suggestionWidgetRef.current.parentNode.removeChild(suggestionWidgetRef.current);
      suggestionWidgetRef.current = null;
    }
  };

  const fetchSuggestionsForCurrentLine = async () => {
    const model = editorRef.current.getModel();
    const position = editorRef.current.getPosition();

    if (model && position) {
      const lineNumber = position.lineNumber;
      if (lineNumber !== lastLineNumber) {
        const prompt = model.getValue();
        const fetchedSuggestions = await fetchSuggestions(prompt, language);
        setSuggestions(fetchedSuggestions);
        if (fetchedSuggestions.length > 0) {
          const suggestion = fetchedSuggestions[0];
          showSuggestionWidget(editorRef.current, suggestion);
          setLastLineNumber(lineNumber);
        }
      }
    }
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang] || '');
    suggestionCache.current = {};
    abortControllerRef.current?.abort(); 
    abortControllerRef.current = new AbortController();
  };

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();

    editor.onDidChangeModelContent(() => {
      const model = editor.getModel();
      if (model) {
        fetchSuggestionsForCurrentLine(); 
      }
    });

    editor.onDidChangeCursorPosition(fetchSuggestionsForCurrentLine);

    editor.addCommand(monaco.KeyCode.Tab, () => {
      if (suggestionWidgetRef.current) {
        const suggestion = suggestionWidgetRef.current.innerText;
        const position = editor.getPosition();

        if (position) {
          editor.executeEdits('', [{
            range: new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column
            ),
            text: suggestion,
            forceMoveMarkers: true
          }]);
          hideSuggestionWidget();
        } else {
          console.error('Cannot apply suggestion: Editor position is null.');
        }
      }
    });
  };

  const saveCode = async () => {
    if (value === CODE_SNIPPETS[language]) {
      setFeedbackMessage("Please make changes to the code before saving.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/codes', {
        title,
        description,
        code: value,
        language,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
  
      setFeedbackMessage("Code saved successfully!");
      console.log('Code saved successfully:', response.data);
    } catch (error) {
      setFeedbackMessage("Error saving code. Please try again.");
      console.error('Error saving code:', error);
    }
  };
  

  useEffect(() => {
    const fetchInitialSuggestions = async () => {
      const initialPrompt = value || CODE_SNIPPETS[language] || '';
      const fetchedSuggestions = await fetchSuggestions(initialPrompt, language);
      setSuggestions(fetchedSuggestions);
    };

    fetchInitialSuggestions();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [language]);

  return (
    <div className="code-editor-wrapper">
      <div className="code-editor-container">
        <div className="editor-container">
          <Link to={"/web-editor"}>Go to web editor</Link>
          <LanguageSelector language={language} onSelect={onSelect} />
          <button
                className="auto-correct-button"
                onClick={() => {
                const prompt = editorRef.current.getValue();
                fetchSuggestions(prompt, language, 'correction').then((corrections) => {
                if (corrections.length > 0) {
                  editorRef.current.setValue(corrections.join('\n'));
                  setFeedbackMessage("Code corrected successfully!");
                } else {
                  setFeedbackMessage("No corrections found.");
              }
         });
    }}
>
  Auto-Correct
</button>

          <Editor
            options={{
              minimap: {
                enabled: false,
              },
              suggest: {
                showMethods: true,
                showFunctions: true,
                showVariables: true,
                showColors: true,
                showConstants: true,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
          />
          <div className="input-section">
            <input
              type="text"
              className="input-title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="input-description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="save-button" onClick={saveCode}>Save</button>
          </div>
          {feedbackMessage && (
            <div className="feedback-message">
              {feedbackMessage}
            </div>
          )}
        </div>
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );  
};

export default CodeEditor;
