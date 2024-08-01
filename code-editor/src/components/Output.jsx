import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      alert(`An error occurred: ${error.message || "Unable to run code"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Output</div>
      <button
        style={styles.button}
        disabled={isLoading}
        onClick={runCode}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <div
        style={{
          ...styles.outputBox,
          color: isError ? "red" : "",
          borderColor: isError ? "red" : "#333",
        }}
      >
        {output
          ? output.map((line, i) => <div key={i} style={styles.outputLine}>{line}</div>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '50%',
  },
  header: {
    marginBottom: '8px',
    fontSize: '18px',
  },
  button: {
    backgroundColor: 'transparent',
    border: '1px solid #2f855a', // Green border
    color: '#2f855a', // Green text
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '16px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  outputBox: {
    height: '75vh',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid',
    overflowY: 'auto',
    backgroundColor: '#1e1e1e',
    color: '#dcdcdc',
  },
  outputLine: {
    marginBottom: '4px',
  },
};

export default Output;
