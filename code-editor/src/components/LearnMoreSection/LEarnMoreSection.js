import React from 'react';
import './LearnMoreSection.css';

const LearnMoreSection = () => {
  return (
    <section id="learn-more" className="learn-more-section">
      <div className="container">
        <h2>Features</h2>
        <div className="features-list">
          <div className="feature">
            <i className="icon-code"></i>
            <h3>Interactive Code Editor</h3>
            <p>Write and compile your code in real-time.</p>
          </div>
          <div className="feature">
            <i className="icon-users"></i>
            <h3>Developer Community</h3>
            <p>Connect and collaborate with other developers.</p>
          </div>
          <div className="feature">
            <i className="icon-save"></i>
            <h3>Save and Download</h3>
            <p>Save your projects on the server and download them anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMoreSection;
