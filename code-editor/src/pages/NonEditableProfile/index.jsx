import React, { useEffect, useState } from "react";
import axios from "axios";
import { marked } from "marked";
import "./NonEditableProfile.css";

const NonProfile = ({ profile }) => {
  const [readmeContent, setReadmeContent] = useState("");
  const [codes, setCodes] = useState([]);
  const [loadingCodes, setLoadingCodes] = useState(true);
  const [errorCodes, setErrorCodes] = useState(null);

  useEffect(() => {
    if (profile && profile.user_id) {
      console.log('Profile ID:', profile.user_id);

      const fetchReadme = async (user_id) => {
        try {
          const response = await axios.get(`http://localhost:8000/api/profile/${user_id}/readme`, { withCredentials: true });
          if (response.status === 200) {
            setReadmeContent(response.data.readme_content || "");
          } else {
            console.error('Failed to fetch README.md:', response.statusText);
          }
        } catch (error) {
          console.error("Error fetching README.md content:", error.response ? error.response.data : error.message);
        }
      };

      const fetchCodes = async () => {
        try {
          console.log('Fetching codes for user_id:', profile.user_id);

          const response = await axios.get('http://localhost:8000/api/codes', {
            params: { user_id: profile.user_id },
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          });

          if (response.status === 200) {
            setCodes(response.data);
          } else {
            console.error('Failed to fetch codes:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching codes:', error.response ? error.response.data : error.message);
          setErrorCodes('Failed to fetch codes. Make sure the user_id is correctly sent.');
        } finally {
          setLoadingCodes(false);
        }
      };

      fetchReadme(profile.user_id);
      fetchCodes();
    } else {
      console.error('Profile or profile.user_id is missing.');
    }
  }, [profile]);

  const renderMarkdown = (markdown) => {
    return { __html: marked(markdown) };
  };

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

    const extension = extensions[code.language] || 'txt';
    const filename = `${code.title}.${extension}`;

    downloadFile(filename, code.code);
  };

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  if (loadingCodes) return <p>Loading codes...</p>;
  if (errorCodes) return <p>{errorCodes}</p>;

  return (
    
      <div className="profile-details">
        <div className="profile-info">
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Bio: {profile.bio}</p>
        </div>
        <div className="profile-readme">
          {readmeContent && (
            
             
              <div dangerouslySetInnerHTML={renderMarkdown(readmeContent)} />
            
          )}
        </div>
        <div className="profile-codes">
          <h2>Codes</h2>
          {codes.length ? (
            <ul>
              {codes.map((code) => (
                <li key={code.id}>
                  <h3>{code.title}</h3>
                  <p><strong>Description:</strong> {code.description}</p>
                  <p><strong>Language:</strong> {code.language}</p>
                  <button onClick={() => handleDownload(code)}>Download</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No codes found.</p>
          )}
        </div>
      </div>

  );
};

export default NonProfile;