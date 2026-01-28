declare module 'ProfileRemote/Profile' {
  import { ComponentType } from 'react';
  import { User } from '@repo/types/user';

  interface ProfileProps {
    user: User;
    onLogout: () => void;
  }

  const Profile: ComponentType<ProfileProps>;
  export default Profile;
}
