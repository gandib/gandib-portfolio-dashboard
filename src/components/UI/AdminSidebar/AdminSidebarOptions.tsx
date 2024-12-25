import Link from "next/link";

type TLinkItem = {
  href: string;
  label: string;
};
const AdminSidebarOptions = ({ links }: { links: TLinkItem[] }) => {
  return (
    <div className="flex flex-col gap-1 fixed">
      {links?.map((link) => (
        <Link
          key={link?.href}
          href={link?.href}
          className="block w-full rounded-md px-3 py-2  hover:bg-default-200"
        >
          {link?.label}
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebarOptions;
