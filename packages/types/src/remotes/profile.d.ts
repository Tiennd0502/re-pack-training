declare module "ProfileRemote/Profile" {
  import { ComponentType } from "react";

  interface ProfileProps {
    userName?: string;
    userEmail?: string;
    onLogout?: () => void;
  }

  const Profile: ComponentType<ProfileProps>;
  export default Profile;
}
