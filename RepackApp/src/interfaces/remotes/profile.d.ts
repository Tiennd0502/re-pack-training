// Type declarations for remote modules
declare module 'ProfileRemote/Profile' {
  import { ComponentType } from 'react';

  interface ProfileProps {
    userName?: string;
    userEmail?: string;
    onEditPress?: () => void;
  }

  const Profile: ComponentType<ProfileProps>;
  export default Profile;
}
