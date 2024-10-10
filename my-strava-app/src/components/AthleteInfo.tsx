import React from 'react';

interface AthleteInfoProps {
  name: string;
  profilePicture: string;
}

const AthleteInfo: React.FC<AthleteInfoProps> = ({ name, profilePicture }) => {
  return (
    <div>
      <h2>{name}</h2>
      <img src={profilePicture} alt={`${name}'s profile`} width={150} />
    </div>
  );
};

export default AthleteInfo;