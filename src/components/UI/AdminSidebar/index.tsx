"use client";

import { useUser } from "@/src/context/user.provider";
import { Spinner } from "@nextui-org/react";
import AdminSidebarOptions from "./AdminSidebarOptions";
import { adminLinks } from "./constant";

const AdminSidebar = () => {
  const { user: userData, isLoading } = useUser();

  if (isLoading) {
    <p>Loading</p>;
  }

  return (
    <div className="">
      <div className="mt-3 w-4 space-y-2 min-h-screen rounded-xl bg-default-100">
        {isLoading && (
          <div className="  fixed w-1/4 h-14 rounded-md  flex justify-center items-center">
            <Spinner />
          </div>
        )}

        <AdminSidebarOptions links={adminLinks} />
      </div>
    </div>
  );
};

export default AdminSidebar;
