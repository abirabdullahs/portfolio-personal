import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

const db = getFirestore(app);

export default function WebProjectsAdminPanel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    tags: "",
    image: "",
    github: "",
    live: ""
  });

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const snap = await getDocs(collection(db, "webProjects"));
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (editProject) {
      setForm({
        name: editProject.name || "",
        tags: editProject.tags?.join(", ") || "",
        image: editProject.image || "",
        github: editProject.github || "",
        live: editProject.live || ""
      });
    } else {
      setForm({ name: "", tags: "", image: "", github: "", live: "" });
    }
  }, [editProject, modalOpen]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      tags: (form.tags || "")
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
      updatedAt: serverTimestamp()
    };
    if (editProject) {
      await updateDoc(doc(db, "webProjects", editProject.id), data);
      setProjects(projects.map(p => (p.id === editProject.id ? { ...p, ...data } : p)));
    } else {
      const newProject = { ...data, createdAt: serverTimestamp() };
      const docRef = await addDoc(collection(db, "webProjects"), newProject);
      setProjects([...projects, { id: docRef.id, ...newProject }]);
    }
    setSaving(false);
    setModalOpen(false);
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, "webProjects", id));
    setProjects(projects.filter(p => p.id !== id));
  }

  function closeModal() {
    setModalOpen(false);
    setEditProject(null);
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Web Development Projects Admin</h2>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
        onClick={() => {
          setEditProject(null);
          setModalOpen(true);
        }}
      >
        Add New Project
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Tags</th>
              <th className="p-2">Image</th>
              <th className="p-2">GitHub</th>
              <th className="p-2">Live</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="border-t">
                <td className="p-2">{project.name}</td>
                <td className="p-2">{project.tags?.join(", ")}</td>
                <td className="p-2">
                  {project.image && <img src={project.image} alt="img" className="w-16 h-10 object-cover rounded" />}
                </td>
                <td className="p-2">
                  {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="text-blue-600 underline">GitHub</a>}
                </td>
                <td className="p-2">
                  {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="text-green-600 underline">Live</a>}
                </td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded"
                    onClick={() => {
                      setEditProject(project);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">
              {editProject ? "Edit" : "Add"} Project
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Project Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Stack/Tags (comma separated)"
                value={form.tags}
                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Image Link"
                value={form.image}
                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="GitHub Link"
                value={form.github}
                onChange={e => setForm(f => ({ ...f, github: e.target.value }))}
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Live Link"
                value={form.live}
                onChange={e => setForm(f => ({ ...f, live: e.target.value }))}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={saving}
              >
                {saving ? "Saving..." : editProject ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
