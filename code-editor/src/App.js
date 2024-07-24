import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from '../src/pages/landingPage/LandingPage';
// import RegistrationPage from '../src/pages/RegistrationPage/RegistrationPage';
// import ProfilePage from '../src/pages/ProfilePage/ProfilePage';
// import ProjectsPage from '../src/pages/ProjectPage/ProjectPage';
// import SearchPage from '../src/pages/SearchPage/SearchPage';
// import ChatPage from '../src/pages/ChatPage/ChatPage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/register" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chat" element={<ChatPage />} />
         */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
