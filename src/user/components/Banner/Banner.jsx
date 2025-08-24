import React, { useEffect, useState } from "react";
import BannerBg from "../../../assets/images/Banner-bg.png";
import Slide2 from "../../../assets/images/Slide2-bg.jpg";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  // Add multiple slides here
  const slides = [BannerBg, Slide2];
  const [currentSlide, setCurrentSlide] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      className="relative mt-18 h-[90vh] flex items-center justify-center bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${slides[currentSlide]})`,
      }}
    >
      
      <div className="absolute inset-0 bg-black/40"></div>

      
      <div className="relative z-10 text-center text-white max-w-2xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Bitezzo
        </h1>
        <p className="text-lg md:text-xl mb-6 text-yellow-500 font-medium">
          Great Dish @ Great Price
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
          onClick={() => navigate("/products")}
        >
          Shop Now
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              currentSlide === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
}

export default Banner;
