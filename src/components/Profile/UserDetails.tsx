import { Input } from "@mantine/core";
import useAuthStore from "../../store/auth";

const UserDetails = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-5 w-full p-4 rounded-lg">
      <div className="flex items-center gap-1 sm:gap-3">
        <label className="w-28 font-medium text-gray-600">Email:</label>
        <Input value={user?.email || ""} className="flex-1 text-black" />
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <label className="w-28 font-medium text-gray-600">Username:</label>
        <Input value={user?.username} className="flex-1" />
      </div>
    </div>
  );
};

export default UserDetails;
