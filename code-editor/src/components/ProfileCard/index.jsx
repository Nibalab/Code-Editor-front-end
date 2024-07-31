import React from "react";

const ProfileCard = ({ name, email, bio, codesCount, onClick }) => {
  return (
    <div className="profile-card" onClick={onClick}>
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Bio: {bio}</p>
      <p>Codes Count: {codesCount}</p>
    </div>
  );
};

export default ProfileCard;