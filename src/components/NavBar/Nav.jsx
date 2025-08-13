import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Nav() {


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cartItemCount = 3; // Replace with dynamic count
    const navigate = useNavigate()


    return (
        <nav className="bg-[#222831]  shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-18 items-center">
                    {/* Logo */}
                    <a href="/" className="text-2xl font-bold text-red-500">
                        Bitezzo
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <button className="text-white hover:text-red-500 font-medium" onClick={() => navigate('/')}>
                            Home
                        </button>
                        <button className="text-white hover:text-red-500 font-medium" onClick={() => navigate('/')}>
                            Shop
                        </button>
                        <button className="text-white hover:text-red-500 font-medium" onClick={() => navigate('/')}>
                            About
                        </button>
                        <button className="text-white hover:text-red-500 font-medium" onClick={() => navigate('/')}>
                            Contact
                        </button>
                    </div>

                    {/* Search & Cart */}
                    <div className="flex items-center space-x-4">
                        {/* Search input (hidden on mobile) */}
                        <div className="hidden sm:block">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-white focus:ring-indigo-500"
                            />
                        </div>

                        {/* Cart */}
                        <button href="/cart" className="relative text-white hover:text-red-500">
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
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                        <button
    href="/account"
    className="relative text-white hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        {/* User Icon */}
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
            1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-6 2.67-6 6h12c0-3.33-2.67-6-6-6z"
        />
    </svg>
</button>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                type="button"
                                className="text-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-gray-700 border-t border-gray-200">
                    <a
                        href="/"
                        className="block px-4 py-3 text-white hover:bg-indigo-50 hover:text-red-500"
                    >
                        Home
                    </a>
                    <a
                        href="/shop"
                        className="block px-4 py-3 text-white hover:bg-indigo-50 hover:text-red-500"
                    >
                        Shop
                    </a>
                    <a
                        href="/about"
                        className="block px-4 py-3 text-white hover:bg-indigo-50 hover:text-red-500"
                    >
                        About
                    </a>
                    <a
                        href="/contact"
                        className="block px-4 py-3 text-white hover:bg-indigo-50 hover:text-red-500"
                    >
                        Contact
                    </a>
                    <div className="px-4 py-3 border-t border-gray-200">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Nav