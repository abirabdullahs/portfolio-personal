import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore(app);

// Dropdown options
const batches = ["HSC 2026", "HSC 2027", "SSC 2026", "SSC 2027", "For Everyone"];
const feeStatuses = ["Monthly", "Lifetime"];
const statuses = ["Enroll Now", "Pre-book", "Out of Timeline"];

export default function CoursesAdminPanel() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    batch: batches[0],
    fee: "",
    feeStatus: feeStatuses[0],
    features: "",
    status: statuses[0],
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch data from Firestore
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        setCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const enrollSnap = await getDocs(collection(db, "courseEnrollments"));
        setEnrollments(enrollSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        console.error(e);
        setError("Failed to fetch courses/enrollments");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Add new course
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.fee || isNaN(form.fee)) {
      setError("Please provide valid course details");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "courses"), {
        ...form,
        fee: Number(form.fee),
      });
      setForm({
        name: "",
        batch: batches[0],
        fee: "",
        feeStatus: feeStatuses[0],
        features: "",
        status: statuses[0],
        image: "",
      });
      // Refresh list
      const querySnapshot = await getDocs(collection(db, "courses"));
      setCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      console.error(e);
      setError("Failed to add course");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel: Add Course</h2>

      {/* Add Course Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 border p-4 rounded">
        <input
          type="text"
          placeholder="Course Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <select
          value={form.batch}
          onChange={e => setForm(f => ({ ...f, batch: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
        >
          {batches.map(b => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Course Fee"
          value={form.fee}
          onChange={e => setForm(f => ({ ...f, fee: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <select
          value={form.feeStatus}
          onChange={e => setForm(f => ({ ...f, feeStatus: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
        >
          {feeStatuses.map(f => (
            <option key={f}>{f}</option>
          ))}
        </select>
        <textarea
          placeholder="Batch Features"
          value={form.features}
          onChange={e => setForm(f => ({ ...f, features: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
          rows={3}
        />
        <select
          value={form.status}
          onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
        >
          {statuses.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Course Image Link"
          value={form.image}
          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Course"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>

      {/* Course List */}
      <h3 className="text-xl font-semibold mb-4">Existing Courses</h3>
      {courses.length === 0 && <p className="text-gray-500">No courses yet.</p>}
      <ul className="space-y-4">
        {courses.map(c => (
          <li key={c.id} className="border rounded p-4">
            <div className="flex items-center gap-4">
              {c.image && (
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div>
                <h4 className="font-bold text-lg">{c.name}</h4>
                <p className="text-sm text-gray-600">
                  {c.batch} | Fee: {c.fee} ({c.feeStatus})
                </p>
                <p className="text-sm">
                  Status: <span className="font-medium">{c.status}</span>
                </p>
              </div>
            </div>
            {c.features && <p className="mt-2 text-gray-700">{c.features}</p>}

            {/* Enrollments */}
            <div className="mt-3">
              <span className="font-semibold text-blue-700">Enrollments / Pre-book:</span>
              <ul className="ml-2 mt-1">
                {enrollments.filter(e => e.courseId === c.id).length === 0 ? (
                  <li className="text-gray-400 text-sm">No enrollments yet.</li>
                ) : (
                  enrollments
                    .filter(e => e.courseId === c.id)
                    .map(e => (
                      <li key={e.id} className="text-sm text-gray-700">
                        {e.name} ({e.contact})
                      </li>
                    ))
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
