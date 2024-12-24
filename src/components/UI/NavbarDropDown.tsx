"use client";
import { useUser } from "@/src/context/user.provider";
import { logout } from "../../../src/services/AuthService";
import { protectedRoutes } from "@/src/utils/constant";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const NavbarDropDown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handleLogout = () => {
    // logout();
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; secure;";
    setIsLoading(true);
    router.push("/");

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onPress={handleLogout} // Switch to onClick for testing
          key="delete"
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
