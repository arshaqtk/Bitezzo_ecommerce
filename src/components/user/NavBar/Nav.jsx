import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios_instance from '../../../api/axiosConfig';

import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { WishListContext } from '../../../context/WishlistContext';
import { SearchContext } from '../../../context/SearchContext';

// import { AuthContext } from '../../context/AuthContext'

function Nav() {



    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartItemCount, setCartItemsCount] = useState()
    const [wishlistCount, setWishlistCount] = useState()
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    const { user, logout } = useContext(AuthContext)
    const { cartItems } = useContext(CartContext);
    const { wishlistItems } = useContext(WishListContext);
    const { acceptSearchValue } = useContext(SearchContext);



    const navigate = useNavigate()

    function toggleAccountMenu() {
        setShowAccountMenu((prev) => !prev)
       
    }


    useEffect(() => {
        if (!user) return;
        async function fetchData() {
            try {
                const user_id = user.id
               
                const userResponse = await Axios_instance.get(`users/${user_id}`)
                const userData = userResponse.data

                const cartLength = cartItems.length
                setCartItemsCount(cartLength)

                const wishlistLength = userData.wishlist.length
                setWishlistCount(wishlistLength)
            } catch (e) {
                console.error(e);
            }

        }
        fetchData()

    }, [cartItems, wishlistItems])



    const handleSearchInput = (e) => {
        setSearchValue(e.target.value)
        console.log(e.target.value)
    }
    const handleSearchSubmit=(e)=>{
      e.preventDefault();
        acceptSearchValue(searchValue)
    }
    return (
        <nav className="bg-[#222831]   shadow-md fixed top-0 w-full z-10">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-18 items-center">
                    {/* Logo */}
                    <button onClick={() => navigate("/")} className="text-2xl font-bold text-red-500 cursor-pointer">
                        Bitezzo
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <button className="text-white hover:text-red-500 font-medium cursor-pointer" onClick={() => navigate('/')}>
                            Home
                        </button>
                        <button className="text-white hover:text-red-500 font-medium cursor-pointer" onClick={() => navigate('/products')}>
                            Shop
                        </button>
                        <button className="text-white hover:text-red-500 font-medium cursor-pointer" onClick={() => navigate('/')}>
                            About
                        </button>
                        <button className="text-white hover:text-red-500 font-medium cursor-pointer" onClick={() => navigate('/')}>
                            Contact
                        </button>
                    </div>

                    {/* Search & Cart */}
                    <div className="flex items-center space-x-4">
                        {/* Search input (hidden on mobile) */}
                        <div className="hidden sm:block">
                            <form action="" onSubmit={handleSearchSubmit}> <input
                                 onChange={handleSearchInput}
                                type="text"
                                
                                placeholder="Search products..."
                                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-white focus:ring-red-500 cursor-pointer"
                            />
                            <button type='button'></button>
                            </form>
                           
                        </div>

                        {/* Cart */}
                        <button className="relative text-white hover:text-red-500 cursor-pointer"
                            onClick={() => navigate('/cart')}
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
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                        {/* Orders */}
                        <button
                            className="relative text-white hover:text-red-500 cursor-pointer"
                            onClick={() => navigate('/order')}
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
                                    d="M5 7h14l-1.5 12a2 2 0 01-2 2H8.5a2 2 0 01-2-2L5 7z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 7V5a3 3 0 016 0v2"
                                />
                            </svg>


                        </button>

                        <button className="relative text-white hover:text-red-500 cursor-pointer"
                            onClick={() => navigate('/wishlist')}
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
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </button>


                        <div className="relative inline-block">
                            {/* Profile Icon Button */}
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
                            {user ?
                                (showAccountMenu && (
                                    <div className="absolute right-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                                        <ul className="py-1">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>navigate("/profile")}>
                                                {user.username}
                                            </li>
                                            <li className="px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer" onClick={logout}>
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                ))
                                : (showAccountMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                                        <ul className="py-1">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/login')}>
                                                Login
                                            </li>
                                            <li className="px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer" onClick={() => navigate('/signup')}>
                                                Sign-up
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                        </div>
                        {/* <div>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 shadow-md hover:scale-105"
                            >
                                {isDark ? (
                                    <Sun className="h-5 w-5 text-yellow-400" />
                                ) : (
                                    <Moon className="h-5 w-5 text-gray-800" />
                                )}
                            </button>
                        </div> */}

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
                    <button

                        className="block px-4 py-3 text-white hover:bg-indigo-50 hover:text-red-500"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate('/products')}
                        className="block px-4 py-3 text-white hover:bg-indigo-50 hover:text-red-500"
                    >
                        Shop
                    </button>
                    <button

                        className="block px-4 py-3 text-white hover:bg-indigo-50 hover:text-red-500"
                    >
                        About
                    </button>
                    <button

                        className="block px-4 py-3 text-white hover:bg-indigo-50 hover:text-red-500"
                    >
                        Contact
                    </button>
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