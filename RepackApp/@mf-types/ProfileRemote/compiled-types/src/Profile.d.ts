import React from 'react';
interface ProfileProps {
  userName?: string;
  userEmail?: string;
  onEditPress?: () => void;
}
declare const Profile: React.FC<ProfileProps>;
export default Profile;
