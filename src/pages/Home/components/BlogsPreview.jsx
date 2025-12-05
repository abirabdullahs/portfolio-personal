import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFirestore, collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { app } from "../../../firebase";

const db = getFirestore(app);

const sliderVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const categoryColors = {
  Tech: "bg-blue-600/80",
  Web: "bg-purple-600/80",
  CP: "bg-pink-600/80"
};

const BlogsPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "blogs"), (querySnapshot) => {
      setBlogs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);


  const filteredBlogs = selectedCategory === "All"
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <section className="w-full py-12 px-4 flex flex-col items-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-purple-300 mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sliderVariants}
      >
        Latest Blogs
      </motion.h2>
      <div className="flex gap-4 mb-4">
        {["All", "Tech", "Web", "CP"].map(cat => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full font-semibold text-xs border transition-all duration-200 ${selectedCategory === cat ? "bg-purple-500 text-white border-purple-500" : "bg-white/10 text-purple-300 border-purple-300"}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="w-full max-w-5xl pb-2">
        <div className="flex gap-6 flex-col md:flex-row justify-center items-center">
          {filteredBlogs.length === 0 ? (
            <div className="text-gray-400">No blogs available.</div>
          ) : (
            filteredBlogs.slice(0, 3).map(blog => (
              <motion.a
                key={blog.id}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[280px] bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg flex flex-col items-center p-4 border border-purple-400/30 hover:scale-105 hover:shadow-purple-400 transition-transform duration-300 cursor-pointer"
                whileHover={{ scale: 1.08 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sliderVariants}
              >
                <img src={blog.image} alt={blog.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                <h3 className="text-lg font-bold text-white mb-1 h-20 overflow-hidden text-ellipsis">{blog.name}</h3>
                <div className="text-xs text-gray-200 mb-2 h-12 overflow-hidden text-ellipsis">{blog.details}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold mt-2 ${categoryColors[blog.category] || "bg-purple-600/80"}`}>
                  {blog.category}
                </span>
              </motion.a>
            ))
          )}
        </div>
      </div>

      <a
        href="/Blog"
        className="mt-6 px-6 py-2 rounded-xl bg-white/10 backdrop-blur-lg shadow text-purple-300 border border-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 glow-btn"
      >
        Read Blog
      </a>
    </section>
  );
};

export default BlogsPreview;
