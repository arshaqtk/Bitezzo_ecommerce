import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  CubeIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon, // New icon for adding products
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const {adminLogout}=useContext(AuthContext)

  const mainNavigation = [
    { to: "/admin/dashboard", label: "Dashboard", icon: HomeIcon },
    { to: "/admin/users", label: "Users", icon: UserIcon },
    { to: "/admin/products", label: "Products", icon: CubeIcon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBagIcon },
  ];

  const managementLinks = [
    { to: "/admin/add-product", label: "Add Product", icon: PlusCircleIcon },
  ];

  return (
    <aside
      className="
        group
        h-screen 
        bg-white border-r border-gray-200 shadow-sm
        p-4 
        w-20 hover:w-64 
        transition-all duration-300 ease-in-out
        flex flex-col justify-between
      "
    >
      <div>
        {/* Logo */}
        <h1 className="text-xl font-bold text-red-600 mb-6 whitespace-nowrap overflow-hidden">
          <span className="block group-hover:hidden">Bz</span>
          <span className="hidden group-hover:block">Bitezzo</span>
        </h1>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-2">
          {mainNavigation.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="
                text-gray-700
                flex items-center gap-3 px-2 py-2 rounded-lg 
                hover:bg-gray-100 hover:text-gray-900
                transition-colors
              "
            >
              <Icon className="h-6 w-6 text-gray-600" />
              <span className="hidden group-hover:inline">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Management Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-sm font-semibold text-gray-400 mb-2 whitespace-nowrap overflow-hidden hidden group-hover:block">
            Management
          </h2>
          <nav className="flex flex-col gap-2">
            {managementLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="
                  text-gray-700
                  flex items-center gap-3 px-2 py-2 rounded-lg 
                  hover:bg-gray-100 hover:text-gray-900
                  transition-colors
                "
              >
                <Icon className="h-6 w-6 text-gray-600" />
                <span className="hidden group-hover:inline">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() =>adminLogout()}
        className="
          flex items-center gap-3 px-2 py-2 rounded-lg text-gray-700
          hover:bg-gray-100 hover:text-gray-900
          transition-colors
        "
      >
        <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-600" />
        <span className="hidden group-hover:inline">Logout</span>
      </button>
    </aside>
  );
}
