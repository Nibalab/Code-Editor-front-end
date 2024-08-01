import React from "react";
import { useLocation } from "react-router-dom";
import NonProfile from "../../pages/NonEditableProfile"; 

const ProfilePage = () => {
  const location = useLocation();
  const profile = location.state?.profile;

  console.log("Profile data in ProfilePage:", profile);

  if (!profile) {
    return <p>No profile data available. Please select a profile.</p>;
  }

  return <NonProfile profile={profile} />;
};

export default ProfilePage;