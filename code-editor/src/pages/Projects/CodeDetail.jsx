import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CodeDetail = () => {
  const { id } = useParams();
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/codes/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setCode(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch code.');
        setLoading(false);
      }
    };

    fetchCode();
  }, [id]);

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const handleDownload = () => {
    const extensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      csharp: 'cs',
      php: 'php',
    };

    const extension = extensions[code.language] || 'txt';
    const filename = `${code.title}.${extension}`;

    downloadFile(filename, code.code);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.wrapper}>
      <h2>{code.title}</h2>
      <p><strong>Description:</strong> {code.description}</p>
      <p><strong>Language:</strong> {code.language}</p>
      <pre style={styles.codeBlock}>{code.code}</pre>
      <button style={styles.downloadButton} onClick={handleDownload}>Download</button>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    color: '#333',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  codeBlock: {
    backgroundColor: '#282c34',
    color: '#abb2bf',
    padding: '15px',
    borderRadius: '4px',
    overflowX: 'auto',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
  },
  downloadButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    marginTop: '10px',
  },
};

export default CodeDetail;
