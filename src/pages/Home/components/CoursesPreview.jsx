import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../../../firebase";

const db = getFirestore(app);

const sliderVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const CoursesPreview = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "courses"), (querySnapshot) => {
      setCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <section className="w-full py-12 px-4 flex flex-col items-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-pink-300 mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sliderVariants}
      >
        Featured Courses
      </motion.h2>
      <div className="w-full max-w-5xl pb-2">
        <div className="flex gap-6 min-w-[320px] flex-col md:flex-row justify-center items-center">
          {courses.length === 0 ? (
            <div className="text-gray-400">No courses available.</div>
          ) : (
            courses.slice(0, 3).map(course => (
              <motion.div
                key={course.id}
                className="min-w-[280px] bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg flex flex-col items-center p-4 border border-pink-400/30 hover:scale-105 hover:shadow-pink-400 transition-transform duration-300 cursor-pointer"
                whileHover={{ scale: 1.08 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sliderVariants}
              >
                <img src={course.image} alt={course.name} className="w-full h-45 object-cover rounded-xl mb-3" />
                <div className="flex gap-2 mb-2">
                  <span className="bg-blue-600/80 text-white px-2 py-1 rounded-full text-xs font-semibold">{course.batch}</span>
                  <span className="bg-green-600/80 text-white px-2 py-1 rounded-full text-xs font-semibold">{course.fee}৳</span>
                  <span className="bg-pink-600/80 text-white px-2 py-1 rounded-full text-xs font-semibold">{course.feeStatus}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{course.name}</h3>
                <div className="text-xs text-gray-200 mb-2 whitespace-pre-line line-clamp-3">{course.features}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.status === 'Enroll Now' ? 'bg-blue-600 text-white' : course.status === 'Pre-book' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-white'}`}>{course.status}</span>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <a
        href="/Courses"
        className="mt-6 px-6 py-2 rounded-xl bg-white/10 backdrop-blur-lg shadow text-pink-300 border border-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 glow-btn"
      >
        Explore Courses
      </a>
    </section>
  );
};

export default CoursesPreview;
