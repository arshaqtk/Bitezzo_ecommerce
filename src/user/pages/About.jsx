import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center py-12 px-6 md:mt-17">
      <div className="max-w-4xl bg-white/80 shadow-lg rounded-2xl p-10">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-[#37474F] mb-6 text-center">
          About <span className="text-red-500">Bitezzo</span> 🍴
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
          Welcome to <span className="font-semibold">Bitezzo</span>, your one-stop
          destination for fresh, delicious, and high-quality food products
          delivered right to your doorstep. We believe that good food is more
          than just taste – it’s about health, happiness, and sharing moments
          with the people you love.
        </p>

        {/* Mission Section */}
        <h2 className="text-2xl font-bold text-red-600 mb-4">Our Mission</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>To make <span className="font-semibold">freshness accessible</span>.</li>
          <li>To provide <span className="font-semibold">variety at your fingertips</span>.</li>
          <li>To ensure <span className="font-semibold">quality you can trust</span>.</li>
        </ul>

        {/* Why Choose Bitezzo */}
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Why Choose Bitezzo?
        </h2>
        <ul className="grid md:grid-cols-2 gap-4 mb-6">
          <li className="bg-[#FFF3E0] p-4 rounded-xl shadow-sm">
            ✅ Handpicked Products – strict quality checks.
          </li>
          <li className="bg-[#FFF3E0] p-4 rounded-xl shadow-sm">
            🚚 Convenience First – order anytime, anywhere.
          </li>
          <li className="bg-[#FFF3E0] p-4 rounded-xl shadow-sm">
            💰 Affordable & Reliable – best deals, no compromise.
          </li>
          <li className="bg-[#FFF3E0] p-4 rounded-xl shadow-sm">
            ❤️ Customer-Centric – smooth shopping experience.
          </li>
        </ul>

        {/* Vision */}
        <h2 className="text-2xl font-bold text-red-600 mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          To redefine online food shopping by combining{" "}
          <span className="font-semibold">technology, trust, and taste</span> –
          ensuring that every bite you take is worth remembering.
        </p>

        {/* Closing Note */}
        <div className="text-center">
          <p className="text-xl font-semibold text-[#37474F]">
            ✨ Bitezzo – Where Every Bite Matters! ✨
          </p>
        </div>
      </div>
    </div>
  );
}
