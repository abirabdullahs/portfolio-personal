import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore(app);
const categories = ["Programming", "Personal", "Education", "Thesis Article", "Motivation","Others"];

export default function BlogAdminPanel() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    link: "",
    category: categories[0],
    details: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        setBlogs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (editId) {
        // Edit existing blog
        const { updateDoc, doc } = await import("firebase/firestore");
        await updateDoc(doc(db, "blogs", editId), form);
      } else {
        await addDoc(collection(db, "blogs"), form);
      }
      setForm({ name: "", image: "", link: "", category: categories[0], details: "" });
      setEditId(null);
      // Refresh list
      const querySnapshot = await getDocs(collection(db, "blogs"));
      setBlogs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      setError(editId ? "Failed to edit blog" : "Failed to add blog");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel: Add Blog</h2>
  <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Blog Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image Link"
          value={form.image}
          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Blog Link"
          value={form.link}
          onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <select
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <textarea
          placeholder="Blog Details"
          value={form.details}
          onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
          rows={3}
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
          {loading ? (editId ? "Saving..." : "Adding...") : (editId ? "Save Changes" : "Add Blog")}
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <h3 className="text-xl font-semibold mb-2">Existing Blogs</h3>
      <ul className="space-y-2">
        {blogs.map(b => (
          <li key={b.id} className="border rounded p-2">
            <strong>{b.name}</strong> ({b.category})
            <div className="text-sm text-gray-600 mt-1">{b.details}</div>
            <button
              className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded text-xs"
              onClick={() => {
                setForm({ name: b.name, image: b.image, link: b.link, category: b.category, details: b.details || "" });
                setEditId(b.id);
              }}
            >Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
