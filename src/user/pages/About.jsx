import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-10">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 text-center">
          About <span className="text-gray-600">Us</span>
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-2xl mx-auto">
          Welcome to <span className="font-semibold text-gray-900">Bitezzo</span>, your one-stop destination for fresh, delicious, and high-quality food products delivered right to your doorstep. We believe that good food is more than just taste – it’s about health, happiness, and sharing moments with the people you love.
        </p>

        {/* Mission Section */}
        <div className="border-t border-b border-gray-200 py-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Mission</h2>
          <ul className="list-none p-0 m-0 space-y-4 text-gray-700 text-lg">
            <li className="flex items-center space-x-3">
              <span className="text-gray-900 font-extrabold">1.</span>
              <span className="flex-1">To make <span className="font-semibold text-gray-900">freshness accessible</span> to everyone.</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-gray-900 font-extrabold">2.</span>
              <span className="flex-1">To provide <span className="font-semibold text-gray-900">variety at your fingertips</span> with a curated selection of products.</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-gray-900 font-extrabold">3.</span>
              <span className="flex-1">To ensure <span className="font-semibold text-gray-900">quality you can trust</span> through strict quality checks.</span>
            </li>
          </ul>
        </div>

        {/* Why Choose Bitezzo */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Why Choose Bitezzo?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Handpicked Products</h3>
            <p className="text-gray-600">Every item undergoes strict quality checks to meet our high standards.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Convenience First</h3>
            <p className="text-gray-600">Order anytime, anywhere, with our seamless and intuitive platform.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Affordable & Reliable</h3>
            <p className="text-gray-600">Enjoy the best deals without compromising on quality or reliability.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer-Centric</h3>
            <p className="text-gray-600">We are dedicated to providing you with a smooth and enjoyable shopping experience.</p>
          </div>
        </div>

        {/* Vision */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Vision</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center max-w-2xl mx-auto">
          To redefine online food shopping by combining <span className="font-semibold text-gray-900">technology, trust, and taste</span> – ensuring that every bite you take is worth remembering.
        </p>

        {/* Closing Note */}
        <div className="text-center mt-8">
          <p className="text-xl font-extrabold text-gray-900">
            Bitezzo – Where Every Bite Matters!
          </p>
        </div>
      </div>
    </div>
  );
}