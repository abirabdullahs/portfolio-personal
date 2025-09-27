import { useState, useEffect } from "react";
import { app } from "../../firebase";
import { getFirestore, collection , onSnapshot } from "firebase/firestore";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "blogs"), (querySnapshot) => {
      setBlogs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, () => {
      setBlogs([]);
      setLoading(false);
    });
    return () => unsub();
  }, [db]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 font-bangla">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* All Blog Posts from Firebase */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-300 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            কোন পোস্ট পাওয়া যায়নি।
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {blogs.map((blog) => (
              <a
                key={blog.id}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row bg-white/30 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl"
              >
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden flex items-center justify-center">
                  <img
                    src={blog.image}
                    alt={blog.name}
                    className="object-cover rounded-xl"
                    style={{ width: '100%', height: '180px', maxWidth: '320px', maxHeight: '180px' }}
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {blog.name}
                    </h3>
                    {blog.details && (
                      <div className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line mb-2">
                        {blog.details}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">{blog.category}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
