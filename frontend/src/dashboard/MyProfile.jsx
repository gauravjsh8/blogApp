import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function myProfile() {
  const { profile } = useAuth();

  console.log("PROFILE", profile);

  return (
    <div className=" ml-40 justify-center items-center my-20 bg-gray-50">
      <div
        key={profile._id}
        className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2"
      >
        <div className="relative">
          <img
            src={profile?.photo?.url}
            alt="avatar"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
            <img
              src={profile?.photo?.url}
              alt="avatar"
              className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
            />
          </div>
        </div>
        <div className="px-4 py-6 mt-4">
          <h2 className="text-center text-xl font-semibold text-gray-800">
            {profile.name}
          </h2>
          <p className="text-center text-gray-600 mt-2">{profile.email}</p>
          <p className="text-center text-gray-600 mt-2">{profile.phone}</p>
          <p className="text-center text-gray-600 mt-2">{profile.role}</p>
        </div>
      </div>
    </div>
  );
}

export default myProfile;
