import ContactPreview from "./components/ContactPreview";
import AchievementsPreview from "./components/AchievementsPreview";
import WebDevPreview from "./components/WebDevPreview";
import CPPreview from "./components/CPPreview";
import BlogsPreview from "./components/BlogsPreview";
import ProductsPreview from "./components/ProductsPreview";
import CoursesPreview from "./components/CoursesPreview";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { Briefcase, Mail, Github, Linkedin } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "@tsparticles/slim";
import AboutPreview from "./components/AboutPreview";
import teacherImg from "../../assets/images/teacher.png";

export default function Home() {
  // ✅ Fixed particles init
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-black via-[#0a0a1a] to-black text-white overflow-hidden flex flex-col justify-center pt-10">

      {/* Space Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#00000000" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            number: { value: 100 },
            color: { value: ["#ffffff", "#00aaff", "#ffaa00"] },
            shape: { type: "circle" },
            opacity: { value: 0.6 },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, speed: 0.8 },
            links: {
              enable: true,
              color: "#00aaff",
              distance: 120,
              opacity: 0.2,
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="w-44 h-44 mx-auto rounded-full bg-white/10 backdrop-blur-lg shadow-lg flex items-center justify-center border-4 border-cyan-400/40 hover:scale-105 transition-transform">
            <img
              src={teacherImg}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-full shadow-lg"
            />
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I’m Abir Hossain Abdullah
        </motion.h1>

        {/* Typewriter Text */}
        <motion.p
          className="text-lg md:text-2xl text-gray-300 mb-8 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typewriter
            words={[
              "Competitive Programmer",
              "Web Developer",
              "Educator in Science & Technology",
              "Interest in Computer Architecture",
              "Integrating Modern Technology with Islam",
            ]}
            loop={true}
            cursor
            cursorStyle="✦"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="/portfolio"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg hover:opacity-90 transition font-semibold"
          >
            <Briefcase className="w-5 h-5" /> View Portfolio
          </a>
          <a
            href="mailto:abirabdullah3491@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-xl shadow hover:bg-blue-50 transition font-semibold"
          >
            <Mail className="w-5 h-5" /> Hire Me
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-8 mt-10 text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="https://github.com/abirabdullahofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition transform hover:scale-110"
          >
            <Github className="w-7 h-7" />
          </a>
          <a
            href="https://linkedin.com/in/abirabdullahofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition transform hover:scale-110"
          >
            <Linkedin className="w-7 h-7" />
          </a>
        </motion.div>

        {/* Section Previews */}
        <div className="mt-5 space-y-5 w-full">
          <AboutPreview />
          <CoursesPreview />
          <ProductsPreview />
          <BlogsPreview />
          <CPPreview />
          <WebDevPreview />
          <AchievementsPreview />
          <ContactPreview />
        </div>
      </div>
    </div>
  );
}
