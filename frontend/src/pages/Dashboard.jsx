import React from "react";
import { useAuth } from "../context/AuthProvider";

const Dashboard = () => {
  const { user } = useAuth();
  return <div>{user.email}</div>;
};

export default Dashboard;
