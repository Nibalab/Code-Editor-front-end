import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const [codes, setCodes] = useState([]);
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user-codes', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setCodes(response.data);
        setFilteredCodes(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch codes.');
        setLoading(false);
      }
    };

    fetchCodes();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredCodes(
      codes.filter((code) =>
        code.title.toLowerCase().includes(lowerCaseQuery) ||
        code.description.toLowerCase().includes(lowerCaseQuery) ||
        code.language.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [searchQuery, codes]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.wrapper}>
      <h2>Your Saved Codes</h2>
      <input
        type="text"
        placeholder="Search by title, description, or language..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      <ul style={styles.codeList}>
        {filteredCodes.map((code) => (
          <li key={code.id} style={styles.codeItem}>
            <h3 style={styles.title}>
              <Link to={`/code/${code.id}`} style={styles.link}>
                {code.title}
              </Link>
            </h3>
            <p><strong>Description:</strong> {code.description}</p>
            <p><strong>Language:</strong> {code.language}</p>
          </li>
        ))}
      </ul>
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
  searchInput: {
    marginBottom: '20px',
    padding: '10px',
    fontSize: '1em',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  codeList: {
    listStyleType: 'none',
    padding: 0,
  },
  codeItem: {
    marginBottom: '20px',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: '10px',
    fontSize: '1.5em',
    color: '#333',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
  },
};

export default Projects;
