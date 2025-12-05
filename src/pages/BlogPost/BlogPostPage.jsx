import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../firebase';
import SEO from '../../components/SEO';

const db = getFirestore(app);

export default function BlogPostPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      const ref = doc(db, 'blogs', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setBlog({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    }
    fetchBlog();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center">Blog post not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <SEO
        title={`${blog.name} — Abir Hossen Abdullah`}
        description={blog.details ? blog.details.slice(0, 120) : 'Blog post by Abir Hossen Abdullah.'}
        url={`https://abirabdullah.web.app/blog/${blog.id}`}
      />
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <img src={blog.image} alt={blog.name} className="w-full h-56 object-cover rounded-lg mb-4" />
        <h1 className="text-3xl font-bold text-center mb-2">{blog.name}</h1>
        <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line mb-4 text-center">{blog.details}</div>
        <div className="text-center mt-4">
          <a href="/blog" className="text-blue-600 hover:underline">← Back to all blogs</a>
        </div>
      </div>
    </div>
  );
}
