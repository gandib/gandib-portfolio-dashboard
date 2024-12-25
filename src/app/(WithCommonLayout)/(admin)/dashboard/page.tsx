"use client";
import { useUser } from "@/src/context/user.provider";

const Dashboard = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold flex justify-center mb-12">
        My Dashboard
      </h1>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-primary-500">{user?.name}</h2>
        <h2 className="text-tiny text-gray-500">{user?.email}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
