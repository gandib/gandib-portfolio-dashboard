import AdminSidebar from "@/src/components/UI/AdminSidebar";
import { adminLinks } from "@/src/components/UI/AdminSidebar/constant";
import Container from "@/src/components/UI/Container";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="md:hidden">
        <SidebarMenu links={adminLinks} />
      </div>
      <div className="my-3 flex w-full gap-3 justify-center">
        <div className=" md:w-2/6 lg:w-1/5 min-h-full bg-default-100">
          <div className="hidden md:flex">
            <AdminSidebar />
          </div>
        </div>
        <div className="w-11/12 md:5/6">{children}</div>
      </div>
    </Container>
  );
};

export default AdminLayout;
