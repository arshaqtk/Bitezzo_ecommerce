import React from 'react'
import BannerBg from "../../assets/images/Banner-bg.png";

function Banner () {
  return (
     <section
      className="relative h-[90vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${BannerBg})`,
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/50"></div> */}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-2xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Bitezzo
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your journey to amazing products starts here.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg">
          Shop Now
        </button>
      </div>
    </section>
  )
}

export default Banner