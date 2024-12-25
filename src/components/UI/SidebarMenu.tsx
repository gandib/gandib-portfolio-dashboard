"use client";

import { Button } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type TLinks = {
  href: string;
  label: string;
};

const SidebarMenu = ({ links }: { links: TLinks[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMenuClick = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom-start"
        color="secondary"
      >
        <PopoverTrigger>
          <Button
            color="secondary"
            variant="flat"
            className="capitalize"
            onPress={handleMenuClick}
          >
            <Menu />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2 text-black">
            <div className="grid grid-cols-1">
              {links?.map((link) => (
                <Link
                  key={link?.href}
                  onClick={handleClose}
                  className="p-2 text-white"
                  href={link?.href}
                >
                  {link?.label}
                </Link>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SidebarMenu;
