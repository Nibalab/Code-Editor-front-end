import React, { useCallback, useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import Result from './Result';
import './WebEditor.css';

function WebEditor() {
  const [html_edit, setHtml_Edit] = useState('');
  const [css_edit, setCss_Edit] = useState('');
  const [js_edit, setJs_Edit] = useState('');

  const onChangeHtml = useCallback((value) => {
    setHtml_Edit(value);
  }, []);

  const onChangeCss = useCallback((value) => {
    setCss_Edit(value);
  }, []);

  const onChangeJavaScript = useCallback((value) => {
    setJs_Edit(value);
  }, []);

  const srcCode = `
    <html>
    <body>${html_edit}</body>
    <style>${css_edit}</style>
    <script>${js_edit}</script>
    </html>
  `;

  return (
    <div className="code-editor-page">
      <div className="editor-grid">
        <div className="editor-container">
          <h2 className="editor-title">HTML</h2>
          <CodeMirror
            className="code-mirror"
            value={html_edit}
            height="342px"
            theme="dark"
            extensions={[html(true)]}
            onChange={onChangeHtml}
          />
        </div>

        <div className="editor-container">
          <h2 className="editor-title">CSS</h2>
          <CodeMirror
            className="code-mirror"
            value={css_edit}
            height="342px"
            theme="dark"
            extensions={[css(true)]}
            onChange={onChangeCss}
          />
        </div>

        <div className="editor-container">
          <h2 className="editor-title">JavaScript</h2>
          <CodeMirror
            className="code-mirror"
            value={js_edit}
            height="342px"
            theme="dark"
            extensions={[javascript(true)]}
            onChange={onChangeJavaScript}
          />
        </div>
      </div>

      <Result srcCode={srcCode} />
    </div>
  );
}

export default WebEditor;
