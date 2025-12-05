import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFirestore, collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { app } from "../../../firebase";

const db = getFirestore(app);

const sliderVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const WebDevPreview = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  const unsub = onSnapshot(
    collection(db, "webProjects"),
    (querySnapshot) => {
      setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  );

  return () => unsub(); // unsubscribe on unmount
}, []);


  return (
    <section className="w-full py-12 px-4 flex flex-col items-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-blue-300 mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sliderVariants}
      >
        Web Development Projects
      </motion.h2>
      <div className="w-full max-w-5xl overflow-x-auto pb-2">
        <div className="flex gap-6 min-w-[320px]">
          {projects.length === 0 ? (
            <div className="text-gray-400">No projects available.</div>
          ) : (
            projects.map(project => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[280px] bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg flex flex-col items-center p-4 border border-blue-400/30 hover:scale-105 hover:shadow-blue-400 transition-transform duration-300 cursor-pointer"
                whileHover={{ scale: 1.08 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sliderVariants}
              >
                <img src={project.image} alt={project.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.techStack && project.techStack.split(",").map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-900/80 text-blue-300 rounded-full text-xs font-medium animate-pulse">{tech.trim()}</span>
                  ))}
                </div>
                <div className="text-xs text-gray-200 mb-2 whitespace-pre-line line-clamp-3">{project.description}</div>
              </motion.a>
            ))
          )}
        </div>
      </div>
      <a
        href="/Portfolio"
        className="mt-6 px-6 py-2 rounded-xl bg-white/10 backdrop-blur-lg shadow text-blue-300 border border-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 glow-btn"
      >
        See Full Portfolio
      </a>
    </section>
  );
};

export default WebDevPreview;
