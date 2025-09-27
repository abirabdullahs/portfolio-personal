import React from "react";
import { motion } from "framer-motion";
import teacherImg from "../../../assets/images/teacher.png";
import buetLogo from "../../../assets/images/buet_logo.png";

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const AboutPreview = () => (
  <section className="w-full flex justify-center items-center py-16 md:py-24 px-6 md:px-12">
    <motion.div
      className="max-w-5xl w-full bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col md:flex-row gap-10 border border-blue-400/30 p-6 md:p-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* Image Slide */}
      <motion.div
        className="flex flex-col items-center justify-center md:w-1/3"
        variants={slideLeft}
      >
        <img
          src={teacherImg}
          alt="Profile"
          className="w-36 h-36 object-cover rounded-full shadow-lg border-4 border-blue-400 mb-5"
        />
        <div className="bg-gradient-to-r from-blue-900/80 to-blue-700/80 rounded-lg p-3 shadow flex items-center gap-3 border border-blue-400/30">
          <img src={buetLogo} className="h-8 w-8 rounded-full" alt="BUET Logo" />
          <span className="font-semibold text-white text-sm">BUET CSE</span>
        </div>
      </motion.div>

      {/* Text Slide */}
      <motion.div
        className="flex-1 flex flex-col gap-5 text-gray-100 justify-center"
        variants={slideRight}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
          About Me
        </h2>
        <p className="leading-relaxed text-justify text-white/90">
          Hello! I am{" "}
          <span className="font-semibold text-blue-200">
            Abir Hossain Abdullah
          </span>
          , a passionate Competitive Programmer, Web Developer, and Educator.
          Currently studying Computer Science & Engineering at BUET, I love
          solving problems, building digital solutions, and inspiring others
          through teaching and teamwork. My journey is driven by curiosity,
          ethics, and a vision to empower communities with technology.
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-3 py-1 bg-blue-900/80 text-blue-300 rounded-full text-xs font-medium">
            Problem Solving
          </span>
          <span className="px-3 py-1 bg-green-900/80 text-green-300 rounded-full text-xs font-medium">
            Teaching
          </span>
          <span className="px-3 py-1 bg-purple-900/80 text-purple-300 rounded-full text-xs font-medium">
            Teamwork
          </span>
          <span className="px-3 py-1 bg-pink-900/80 text-pink-300 rounded-full text-xs font-medium">
            Web Development
          </span>
        </div>
        <a
          href="/About"
          className="mt-5 self-start px-6 py-2 rounded-xl bg-white/10 backdrop-blur-lg shadow text-blue-300 border border-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 glow-btn"
        >
          Read More
        </a>
      </motion.div>
    </motion.div>
  </section>
);

export default AboutPreview;
