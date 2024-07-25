import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "#3182ce"; // Corresponds to Chakra UI's "blue.400"

const LanguageSelector = ({ language, onSelect }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.label}>Language:</div>
      <div style={styles.menuContainer}>
        <button
          style={styles.menuButton}
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {language}
        </button>
        {isMenuOpen && (
          <div style={styles.menuList}>
            {languages.map(([lang, version]) => (
              <div
                key={lang}
                style={{
                  ...styles.menuItem,
                  color: lang === language ? ACTIVE_COLOR : "",
                  backgroundColor: lang === language ? "#1a202c" : "transparent",
                }}
                onClick={() => {
                  onSelect(lang);
                  setMenuOpen(false);
                }}
              >
                {lang}
                <span style={styles.version}>({version})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginLeft: '8px',
    marginBottom: '16px',
  },
  label: {
    marginBottom: '8px',
    fontSize: '18px',
  },
  menuContainer: {
    position: 'relative',
    display: 'inline-block',
    width: 'max-content', // Allows the menu button to fit its content
  },
  menuButton: {
    backgroundColor: '#2d3748', // Dark background for button
    color: '#e2e8f0', // Light text color
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'left',
    width: 'auto', // Adjust width to fit content
    minWidth: '120px', // Minimum width for the button
    whiteSpace: 'nowrap', // Prevent text wrapping
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  menuList: {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: '#110c1b',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: '1000',
    width: 'auto', // Adjust width to fit content
    minWidth: '120px', // Minimum width for the menu
  },
  menuItem: {
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#e2e8f0',
  },
  version: {
    color: '#a0aec0',
    fontSize: '14px',
  }
};

export default LanguageSelector;
