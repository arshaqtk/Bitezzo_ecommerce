import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios_instance from '../../../api/axiosConfig';

import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { WishListContext } from '../../../context/WishlistContext';
import { SearchContext } from '../../../context/SearchContext';

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishListContext);
  const { acceptSearchValue } = useContext(SearchContext);

  const navigate = useNavigate();
  const location = useLocation();

  function toggleAccountMenu() {
    setShowAccountMenu((prev) => !prev);
  }

  // Close mobile menu and account menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowAccountMenu(false);
  }, [location.pathname]);

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMobileSearchOpen(false); // close search after submit
    acceptSearchValue(searchValue);
    // CRITICAL FIX: Navigate to the products page to display the search results
    navigate("/search");
  };

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    navigate("/");
  };

  return (
    // Outer container to handle fixed position and full width
    <div className="fixed top-0 w-full z-50">
      {/* The main navigation "pillow" container, which is centered and has the styling */}
      <nav className="max-w-6xl mx-auto my-4 py-2 px-6 bg-black rounded-full shadow-lg flex justify-between items-center transition-all duration-300">
        {/* The inner content of the nav bar */}
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-red-500 cursor-pointer"
          >
            Bitezzo
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button
              className="text-white hover:text-red-500 font-medium cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="text-white hover:text-red-500 font-medium cursor-pointer"
              onClick={() => navigate("/products")}
            >
              Shop
            </button>
            <button
              className="text-white hover:text-red-500 font-medium cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About
            </button>
            <button
              className="text-white hover:text-red-500 font-medium cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact
            </button>
          </div>

          {/* Search & Cart Icons */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:block">
              <input
                onChange={handleSearchInput}
                type="text"
                placeholder="Search products..."
                className="px-3 py-1 border border-gray-300 rounded-full 
                            focus:outline-none focus:ring-2 text-white 
                            focus:ring-red-500 cursor-pointer bg-gray-700"
              />
            </form>

            {/* Mobile Search & Mobile Menu (conditionally rendered) */}
            {mobileSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center w-[60vw] ml-2 mr-2">
                <input
                  onChange={handleSearchInput}
                  type="text"
                  placeholder="Search products..."
                  autoFocus
                  className="flex-grow px-3 py-1 border border-gray-300 rounded-full 
                            focus:outline-none focus:ring-2 text-black 
                            focus:ring-red-500 bg-gray-200"
                />
                <button
                  onClick={() => setMobileSearchOpen(false)}
                  type="button"
                  className="ml-2 text-white hover:text-red-500 cursor-pointer"
                  aria-label="Close search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </form>
            ) : (
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="block sm:hidden text-white hover:text-red-500 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </button>
            )}

            {/* Cart Icon */}
            <button
              className="relative text-white hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                />
                <circle cx="7" cy="21" r="1" />
                <circle cx="17" cy="21" r="1" />
              </svg>
              {cartItems?.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Wishlist Icon */}
            <button
              className="relative text-white hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/wishlist")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 
                  6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
              {wishlistItems?.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Account Dropdown */}
            <div className="relative inline-block">
              <button
                onClick={toggleAccountMenu}
                className="relative text-white hover:text-blue-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                    1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-6 2.67-6 6h12c0-3.33-2.67-6-6-6z"
                  />
                </svg>
              </button>
              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                  <ul className="py-1">
                    {user ? (
                      <>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => navigate("/profile")}
                        >
                          My Profile
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => navigate("/order")}
                        >
                          My Orders
                        </li>
                        <li
                          className="px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            navigate("/login");
                            setShowAccountMenu(false);
                          }}
                        >
                          Login
                        </li>
                        <li
                          className="px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer"
                          onClick={() => {
                            navigate("/signup");
                            setShowAccountMenu(false);
                          }}
                        >
                          Sign-up
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="text-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - moved outside the main nav bar to be full-width */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-[#222831] shadow-lg rounded-b-lg">
          <button
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-3 text-white hover:bg-red-500 w-full text-left"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/products");
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-3 text-white hover:bg-red-500 w-full text-left"
          >
            Shop
          </button>
          <button
            onClick={() => {
              navigate("/about");
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-3 text-white hover:bg-red-500 w-full text-left"
          >
            About
          </button>
          <button
            onClick={() => {
              navigate("/contact");
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-3 text-white hover:bg-red-500 w-full text-left"
          >
            Contact
          </button>
        </div>
      )}
    </div>
  );
}

export default Nav;