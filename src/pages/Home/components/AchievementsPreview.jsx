import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFirestore, collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { app } from "../../../firebase";

const db = getFirestore(app);

const timelineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const AchievementsPreview = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "achievements"), orderBy("timestamp", "desc"), limit(6));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setAchievements(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <section className="w-full py-12 px-4 flex flex-col items-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-yellow-300 mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={timelineVariants}
      >
        Achievements
      </motion.h2>
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {achievements.length === 0 ? (
          <div className="text-gray-400">No achievements available.</div>
        ) : (
          achievements.slice(0, 3).map((ach, idx) => (
            <motion.div
              key={ach.id}
              className={`relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-yellow-400/30 flex items-center gap-6 ${idx % 2 === 0 ? 'ml-0 md:ml-12' : 'mr-0 md:mr-12'}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={timelineVariants}
            >
              <div className="flex-shrink-0">
                <img src={ach.image} alt={ach.title} className="w-16 h-16 object-cover rounded-full border-4 border-yellow-300 shadow-lg" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-200 mb-1">{ach.title}</h3>
                <div className="text-xs text-gray-200 mb-2 whitespace-pre-line line-clamp-3">{ach.description}</div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-600 text-white mt-2">{ach.year}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
      <a
        href="/Achievements"
        className="mt-6 px-6 py-2 rounded-xl bg-white/10 backdrop-blur-lg shadow text-yellow-300 border border-yellow-400 hover:bg-yellow-500 hover:text-white transition-all duration-300 glow-btn"
      >
        View All Achievements
      </a>
    </section>
  );
};

export default AchievementsPreview;
