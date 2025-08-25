import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  CubeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const menu = [
    { to: "/admin/dashboard", label: "Dashboard", icon: HomeIcon },
    { to: "/admin/users", label: "Users", icon: UserIcon },
    { to: "/admin/products", label: "Products", icon: CubeIcon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon },
  ];

  return (
    <aside className="h-screen bg-[#F5F7FA] shadow-md p-4 w-20 md:w-64">
      <h1 className="text-xl font-bold text-red-500 mb-6">
        <span className="block md:hidden">B</span>
        <span className="hidden md:block">Bitezzo</span>
      </h1>

      <nav className="flex flex-col gap-4">
        {menu.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-200"
          >
            <Icon className="h-6 w-6 text-gray-600" />
            <span className="hidden md:inline">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
