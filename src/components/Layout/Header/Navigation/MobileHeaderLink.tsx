import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = (e?: React.MouseEvent) => {
    if (item.submenu) {
      e?.preventDefault();
      setSubmenuOpen((s) => !s);
    }
  };

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        onClick={(e) => (item.submenu ? handleToggle(e) : undefined)}
        className="flex items-center justify-between w-full py-3 px-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-150"
      >
        <span className="text-base font-medium">{item.label}</span>
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className={`transition-transform ${submenuOpen ? "rotate-180" : ""}`}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>

      {submenuOpen && item.submenu && (
        <div
          // solid white + elevation + sits above overlay/panel content
          style={{ backgroundColor: "#ffffff", zIndex: 60 }}
          className="mt-1 ml-2 rounded-xl border border-gray-100 shadow-md overflow-hidden"
        >
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className="block py-2.5 px-5 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors duration-150"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
