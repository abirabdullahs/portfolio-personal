import React from "react";
import { motion } from "framer-motion";
// You can use react-tsparticles or similar for animated background
// import Particles from "react-tsparticles";

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const name = "Your Name"; // Replace with your name
const tagline = "Developer | Programmer | Educator";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center overflow-hidden">
      {/* Animated Background (gradient waves, particles, etc.) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-700 opacity-80 animate-gradient-wave"></div>
      {/* Optionally add particles here */}
      {/* <Particles ... /> */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        Hi, I’m {name}
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mb-8 font-poppins text-white/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        {tagline}
      </motion.p>
      <div className="flex gap-6 justify-center">
        <motion.a
          href="/Portfolio"
          className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-lg shadow-lg text-lg font-semibold text-white border border-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 glow-btn"
          whileHover={{ scale: 1.08, boxShadow: "0 0 20px #e879f9" }}
        >
          Explore Portfolio
        </motion.a>
        <motion.a
          href="/Contact"
          className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-lg shadow-lg text-lg font-semibold text-white border border-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 glow-btn"
          whileHover={{ scale: 1.08, boxShadow: "0 0 20px #60a5fa" }}
        >
          Contact Me
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
