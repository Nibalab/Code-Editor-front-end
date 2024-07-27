import { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user-codes', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setCodes(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch codes.');
        setLoading(false);
      }
    };

    fetchCodes();
  }, []);

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const handleDownload = (code) => {
    const extensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      csharp: 'cs',
      php: 'php',
    };

    const extension = extensions[code.language] || 'txt'; // Default to 'txt' if language not found
    const filename = `${code.title}.${extension}`;
    
    downloadFile(filename, code.code);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Saved Codes</h2>
      <ul>
        {codes.map((code) => (
          <li key={code.id}>
            <h3>{code.title}</h3>
            <p><strong>Description:</strong> {code.description}</p>
            <p><strong>Language:</strong> {code.language}</p>
            <pre>{code.code}</pre>
            <button onClick={() => handleDownload(code)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
