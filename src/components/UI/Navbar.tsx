"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { siteConfig } from "@/src/config/site";
import { Logo } from "@/src/components/icons";
import NavbarDropDown from "./NavbarDropDown";
import { ThemeSwitch } from "./theme-switch";
import { useUser } from "@/src/context/user.provider";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/src/services/AuthService";
import { protectedRoutes } from "@/src/utils/constant";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();

  // const handleLogout = () => {
  //   // logout();
  //   document.cookie =
  //     "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; secure;";
  //   setIsLoading(true);
  //   router.push("/");

  //   if (protectedRoutes.some((route) => pathname.match(route))) {
  //     router.push("/");
  //   }
  // };

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.success) {
        router.push("/");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-lg text-inherit">Gandib</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start items-center ml-2">
          {/* <NavbarItem>
            <NextLink
              className={`text-sm font-bold ${pathname === "/recent-products" ? "text-primary-500" : ""}`}
              href="/recent-products"
            >
              Recent Products
            </NextLink>
          </NavbarItem> */}
          {/* <NavbarItem>
            <NextLink
              className={`text-lg ${pathname === "/shop" ? "text-primary-500" : ""}`}
              href="/shop"
            >
              Shop
            </NextLink>
          </NavbarItem> */}

          {user?.email && (
            <>
              {/* <NavbarItem>
                <NextLink
                  href={
                    user?.role === "USER"
                      ? "/user-dashboard"
                      : user?.role === "ADMIN"
                        ? "/admin-dashboard"
                        : "/vendor-dashboard"
                  }
                  className={`text-sm font-bold ${pathname === "/user-dashboard" ? "text-primary-500" : ""} ${pathname === "/admin-dashboard" ? "text-primary-500" : ""} ${pathname === "/vendor-dashboard" ? "text-primary-500" : ""}`}
                >
                  Dashboard
                </NextLink>
              </NavbarItem> */}
            </>
          )}
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathname === item.href ? "primary" : "foreground"}
                href={item.href}
                size="lg"
                className="font-bold"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden md:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {user && user.email ? (
          <NavbarItem className="hidden lg:flex gap-2">
            <NavbarDropDown />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {/* <NavbarItem>
            <NextLink
              className={`text-lg ${pathname === "/recent-products" ? "text-primary-500" : ""}`}
              href="/recent-products"
            >
              Recent Products
            </NextLink>
          </NavbarItem> */}
          {/* <NavbarItem>
            <NextLink
              className={`text-lg ${pathname === "/shop" ? "text-primary-500" : ""}`}
              href="/shop"
            >
              Shop
            </NextLink>
          </NavbarItem> */}
          {user?.email && (
            <>
              {/* <NavbarItem>
                <NextLink
                  href={
                    user?.role === "USER"
                      ? "/user-dashboard"
                      : user?.role === "ADMIN"
                        ? "/admin-dashboard"
                        : "/vendor-dashboard"
                  }
                  className={`text-lg ${pathname === "/user-dashboard" ? "text-primary-500" : ""} ${pathname === "/admin-dashboard" ? "text-primary-500" : ""} ${pathname === "/vendor-dashboard" ? "text-primary-500" : ""}`}
                >
                  Dashboard
                </NextLink>
              </NavbarItem> */}
            </>
          )}
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathname === item.href ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {user && user.email ? (
            <p
              onClick={handleLogout}
              className="font-bold cursor-pointer bg-default-200 hover:bg-red-500 w-fit py-2 px-4 rounded-md"
            >
              Logout
            </p>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
