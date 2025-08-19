
function Footer() {
  return (
   
    <footer className="bg-[#222831] text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        

        <div>
          <h1 className="text-2xl font-bold text-white mb-4">Bitezzo</h1>
          <p className="text-sm leading-6">
            Delicious meals delivered to your door. Fresh ingredients, quick service, and unbeatable taste.
          </p>
        </div>

   
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><button  className="hover:text-white transition">Home</button></li>
            <li><button className="hover:text-white transition">Menu</button></li>
            <li><button  className="hover:text-white transition">About Us</button></li>
            <li><button  className="hover:text-white transition">Contact</button></li>
          </ul>
        </div>

       
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Customer Service</h2>
          <ul className="space-y-2">
            <li><button  className="hover:text-white transition">FAQ</button></li>
            <li><button  className="hover:text-white transition">Shipping Info</button></li>
            <li><button  className="hover:text-white transition">Returns & Refunds</button></li>
            <li><button  className="hover:text-white transition">Support</button></li>
          </ul>
        </div>

      
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Stay Updated</h2>
          <p className="text-sm mb-4">Subscribe to get the latest offers and news.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg text-white focus:outline-none w-full sm:w-auto border"
            />
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Bitezzo. All rights reserved.
      </div>
    </footer>
  );
}

 

export default Footer