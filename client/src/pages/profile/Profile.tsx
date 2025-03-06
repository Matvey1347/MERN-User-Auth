import { useContext } from "react";
import Button from "../../components/Global/Button";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <div>
      <h1>ProfilePage</h1>
    </div>
  )
}
export default ProfilePage;