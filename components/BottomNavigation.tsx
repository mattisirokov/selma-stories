import Link from "next/link";

const bottomNavigationLinks = [
  {
    name: "Your stories",
    href: "/stories",
  },
  {
    name: "New story",
    href: "/create-story",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

function BottomNavigation() {
  return (
    <div
      className={
        "mb-4 flex w-screen flex-row items-center justify-center gap-6"
      }
    >
      {bottomNavigationLinks.map((link) => (
        <Link
          key={link.name}
          className={
            "flex items-center justify-center rounded-md bg-black p-4 text-white"
          }
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default BottomNavigation;
