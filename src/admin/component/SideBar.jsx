import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  CubeIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const menu = [
    { to: "/admin/dashboard", label: "Dashboard", icon: HomeIcon },
    { to: "/admin/users", label: "Users", icon: UserIcon },
    { to: "/admin/products", label: "Products", icon: CubeIcon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon },
  ];

  return (
    <aside
      className="
        group
        h-screen 
        bg-[#09122C] shadow-md 
        p-4 
        w-20 hover:w-64 
        transition-all duration-300 ease-in-out
        flex flex-col justify-between
      "
    >
      <div>
        {/* Logo */}
        <h1 className="text-xl font-bold text-red-500 mb-6 whitespace-nowrap overflow-hidden">
          <span className="block group-hover:hidden">Bz</span>
          <span className="hidden group-hover:block">Bitezzo</span>
        </h1>

        {/* Nav */}
        <nav className="flex flex-col gap-4">
          {menu.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="
              text-white
                flex items-center gap-3 px-2 py-2 rounded-lg 
                hover:bg-[#09122C] 
                transition-colors
              "
            >
              <Icon className="h-6 w-6 text-white" />
              <span className="hidden group-hover:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-200"
      >
        <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-600" />
        <span className="hidden group-hover:inline">Logout</span>
      </button>
    </aside>
  );
}
