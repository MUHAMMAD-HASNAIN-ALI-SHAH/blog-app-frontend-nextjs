import UserDetails from "./UserDetails";
import UserIcon from "./UserIcon";

const User = () => {
  return (
    <div className="flex flex-col md:flex-row justify-start gap-5 items-center rounded-lg shadow-lg p-6">
      <UserIcon />
      <UserDetails />
    </div>
  );
};

export default User;
