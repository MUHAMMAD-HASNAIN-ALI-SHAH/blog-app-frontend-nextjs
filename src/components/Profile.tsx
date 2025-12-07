import User from "../components/Profile/User";

const Profile = () => {
  return (
    <div className="w-full mt-20">
      <div className="w-full md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
        <div className="w-full mt-5">
          <User />
        </div>
      </div>
    </div>
  );
};

export default Profile;
