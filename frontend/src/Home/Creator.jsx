import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Creator = () => {
  const [admins, setAdmins] = useState([]);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/admins"
      );
      setAdmins(response.data.admin || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <>
      <div className="container mx-auto px-8">
        <h1 className="mb-8 font-bold text-2xl"> Popular Creators</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 space-y-4  md:place-items-start place-items-center">
          {admins && admins.length > 0 ? (
            admins.map((admin) => (
              <Link
                to="/"
                key={admin._id}
                className="flex flex-col items-center space-y-2"
              >
                <img
                  src={admin?.photo?.url || "/default-profile.png"}
                  className="w-20 h-20 rounded-full object-cover"
                  alt={admin.name}
                />
                <p className="font-medium text-base">{admin.name}</p>
                <p className="text-sm text-gray-500">{admin.role}</p>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full">No admins found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Creator;
