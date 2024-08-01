import React from "react";
import "./index.css"

const ProfileCard = ({ name, email, bio, codesCount, onClick }) => {
  return (
    <div className="window">
    <div className="profile-card" onClick={onClick}>
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Bio: {bio}</p>
      <p>Codes Count: {codesCount}</p>
    </div></div>
  );
};

export default ProfileCard;