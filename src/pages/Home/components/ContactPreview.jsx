import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const icons = [
  {
    name: "Email",
    icon: <FaEnvelope size={28} />, 
    link: "mailto:abirabdullah3491@gmail.com",
    color: "bg-pink-500"
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin size={28} />, 
    link: "https://linkedin.com/in/abirabdullahofficial",
    color: "bg-blue-600"
  },
  {
    name: "GitHub",
    icon: <FaGithub size={28} />, 
    link: "https://github.com/abirabdullahofficial",
    color: "bg-gray-800"
  }
];

const ContactPreview = () => (
  <section className="w-full py-12 px-4 flex flex-col items-center">
    <motion.h2
      className="text-2xl md:text-3xl font-bold text-pink-300 mb-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      Get in Touch
    </motion.h2>
    <motion.div
      className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center border border-pink-400/30"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="flex gap-8 mb-6">
        {icons.map((item, idx) => (
          <a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full p-4 ${item.color} text-white shadow-lg hover:scale-110 hover:shadow-pink-400 transition-all duration-300 floating-icon`}
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            {item.icon}
          </a>
        ))}
      </div>
      <div className="text-white/80 text-lg mb-4 text-center">
        Feel free to reach out for collaboration, queries, or just to say hi!
      </div>
      <a
        href="/Contact"
        className="mt-2 px-6 py-2 rounded-xl bg-white/10 backdrop-blur-lg shadow text-pink-300 border border-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 glow-btn"
      >
        Get in Touch
      </a>
    </motion.div>
  </section>
);

export default ContactPreview;
