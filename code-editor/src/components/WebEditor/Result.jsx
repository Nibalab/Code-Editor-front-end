import React from 'react';
import './WebEditor.css';

function Result({ srcCode }) {
    return (
        <div className="result-container">
            <h2 className="result-title">
                Result
            </h2>
            <iframe
                className="result-iframe"
                srcDoc={srcCode}
                title="output"
                sandbox="allow-scripts"
            >
            </iframe>
        </div>
    );
}

export default Result;