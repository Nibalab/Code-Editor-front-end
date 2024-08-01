import React, { useEffect, useState } from "react";
import axios from "axios";
import { marked } from "marked";
import './profile.css';
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [readmeFile, setReadmeFile] = useState(null);
  const [readmeContent, setReadmeContent] = useState("");
 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile/current", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setProfile(response.data);
          setBio(response.data.bio || "");
          setReadmeContent(response.data.readme_content || "");
        }
      } catch (error) {
        console.error(
          "Error fetching profile data:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      const fetchReadme = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/profile/readme",
            { withCredentials: true }
          );
          if (response.status === 200) {
            setReadmeContent(response.data.readme_content || "");
          }
        } catch (error) {
          console.error(
            "Error fetching README.md content:",
            error.response ? error.response.data : error.message
          );
        }
      };
      fetchReadme();
    }
  }, [profile]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleReadmeFileChange = (event) => {
    setReadmeFile(event.target.files[0]);
  };

  

  const handleSubmitBio = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("bio", bio);
      const response = await axios.post(
        "http://localhost:8000/api/profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.data && response.data.profile) {
        setProfile(response.data.profile);
      } else {
        console.error("Profile data is missing in the response");
      }
    } catch (error) {
      console.error(
        "Error saving profile data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmitReadme = async (event) => {
    event.preventDefault();
    try {
      if (readmeFile) {
        const readmeFormData = new FormData();
        readmeFormData.append("readme_file", readmeFile);
        const readmeResponse = await axios.post(
          `http://localhost:8000/api/profile/${profile.id}/upload-readme`,
          readmeFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        console.log("README.md upload response:", readmeResponse.data);
        const content = await readmeFile.text();
        setReadmeContent(content);
      }
    } catch (error) {
      console.error(
        "Error uploading README.md file:",
        error.response ? error.response.data : error.message
      );
    }
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderMarkdown = (markdown) => {
    return { __html: marked(markdown) };
  };

  return (
    <div className="window">
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Profile</h1>
      {profile ? (
        <>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Bio: {profile.bio}</p>
          {readmeContent && (
            <div>
              <h2>README.md Content</h2>
              <div dangerouslySetInnerHTML={renderMarkdown(readmeContent)} />
            </div>
          )}
          <form onSubmit={handleSubmitBio}>
            <label>
              Update Bio:
              <textarea value={bio} onChange={handleBioChange} />
            </label>
            <button type="submit">Update Bio</button>
          </form>
          <form onSubmit={handleSubmitReadme}>
            <label>
              Upload README.md:
              <input
                type="file"
                accept=".md"
                onChange={handleReadmeFileChange}
              />
            </label>
            <button type="submit">Upload README.md</button>
          </form>
          
        </>
      ) : (
        <>
          <form onSubmit={handleSubmitBio}>
            <label>
              Create Bio:
              <textarea value={bio} onChange={handleBioChange} />
            </label>
            <button type="submit">Create Profile</button>
          </form>
          <form onSubmit={handleSubmitReadme}>
            <label>
              Upload README.md:
              <input
                type="file"
                accept=".md"
                onChange={handleReadmeFileChange}
              />
            </label>
            <button type="submit">Upload README.md</button>
          </form>
        </>
      )}
    </div>
    </div>
  );
};

export default Profile;