import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../../../firebase";

const db = getFirestore(app);

// Online icons
const codeforcesIcon = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Codeforces_logo.svg";
const leetcodeIcon = "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png";
const codechefIcon = "https://cdn.codechef.com/images/cc-logo.svg";

const platforms = [
  { name: "Codeforces", bg: "from-blue-800/80 to-blue-600/80", icon: codeforcesIcon },
  { name: "LeetCode", bg: "from-yellow-600/80 to-yellow-400/80", icon: leetcodeIcon },
  { name: "CodeChef", bg: "from-purple-800/80 to-purple-600/80", icon: codechefIcon }
];

const CPPreview = () => {
  const [stats, setStats] = useState({ solved: 300, cf: 200, lc: 10, cc: 30 });
  const [count, setCount] = useState(0);

  // Firestore data fetch
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cpStats"), (querySnapshot) => {
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setStats({
          solved: data.solved || 0,
          cf: data.cf || 0,
          lc: data.lc || 0,
          cc: data.cc || 0
        });
      }
    });
    return () => unsub();
  }, []);

  // Counter animation for "Problems Solved"
  useEffect(() => {
    let start = 0;
    const end = stats.solved;
    if (end === 0) return;

    const duration = 1500; // 1.5s animation
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [stats.solved]);

  return (
    <section className="w-full py-16 px-6 flex flex-col items-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-pink-300 mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Competitive Programming
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl justify-center items-center">
        {/* Stats Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-10 flex flex-col items-center border border-pink-400/30 min-w-[240px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-5xl font-extrabold text-pink-300 mb-2 drop-shadow-lg">
            {count}+
          </div>
          <div className="text-lg text-white mb-4">Problems Solved</div>
          <div className="flex gap-4 mt-3">
            {platforms.map((p) => (
              <div
                key={p.name}
                className={`flex flex-col items-center gap-1 bg-gradient-to-br ${p.bg} rounded-xl px-4 py-3 shadow-lg border border-white/20`}
              >
                <img src={p.icon} alt={p.name} className="w-8 h-8 mb-1 drop-shadow" />
                <span className="text-xs font-bold text-white">{p.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress Bars */}
        <motion.div
          className="flex flex-col gap-5 w-full md:w-auto justify-center items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="w-full max-w-xs">
            <div className="mb-1 text-white font-semibold">Codeforces</div>
            <div className="w-full bg-pink-900/30 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(stats.cf / 12, 100)}%` }}
              ></div>
            </div>

            <div className="mb-1 text-white font-semibold mt-5">LeetCode</div>
            <div className="w-full bg-pink-900/30 rounded-full h-4">
              <div
                className="bg-yellow-500 h-4 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(stats.lc / 12, 100)}%` }}
              ></div>
            </div>

            <div className="mb-1 text-white font-semibold mt-5">CodeChef</div>
            <div className="w-full bg-pink-900/30 rounded-full h-4">
              <div
                className="bg-purple-600 h-4 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(stats.cc / 12, 100)}%` }}
              ></div>
            </div>
          </div>

          <a
            href="/CompetitiveProgrammer"
            className="mt-8 px-6 py-2 rounded-xl bg-white/10 backdrop-blur-lg shadow text-pink-300 border border-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 glow-btn"
          >
            View Details
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CPPreview;
