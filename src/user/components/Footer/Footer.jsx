import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Bitezzo</h1>
            <p className="text-sm leading-6 text-gray-400">
              Delicious meals delivered to your door. Fresh ingredients, quick service, and unbeatable taste.
            </p>
            <div className="flex space-x-4 pt-4">
              <button className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </button>
            </div>
          </div>
              
          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Shop", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <button 
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm hover:underline"
                    onClick={() => navigate(link.path)}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
                  
          {/* Customer Service */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Customer Service</h2>
            <ul className="space-y-3">
              {[
                "FAQ",
                "Shipping Info", 
                "Returns & Refunds",
                "Support"
              ].map((service) => (
                <li key={service}>
                  <button className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm hover:underline">
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>
                 
          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Stay Updated</h2>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest offers and news delivered to your inbox.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Bitezzo. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {[
                "Privacy Policy",
                "Terms of Service", 
                "Cookie Policy"
              ].map((policy) => (
                <button 
                  key={policy}
                  className="text-sm text-gray-500 hover:text-red-400 transition-colors duration-200"
                >
                  {policy}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;