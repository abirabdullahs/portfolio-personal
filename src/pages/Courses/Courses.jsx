import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { app } from "../../firebase";

import Educator from "../Educator/Educator";

const db = getFirestore(app);

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollForm, setEnrollForm] = useState({ name: "", contact: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "courses"), (querySnapshot) => {
      setCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  async function handleEnroll(e) {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    try {
      await addDoc(collection(db, "courseEnrollments"), {
        ...enrollForm,
        courseId: selectedCourse.id,
        courseName: selectedCourse.name,
        batch: selectedCourse.batch,
        status: selectedCourse.status,
        timestamp: Date.now(),
      });
      setSuccess("Enrollment submitted!");
      setEnrollForm({ name: "", contact: "" });
      setTimeout(() => setModalOpen(false), 1200);
    } catch {
      setSuccess("Failed to submit. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      

        {/* Educator page content at the bottom */}
        <div className="mt-12">
          <Educator />
        </div>

      
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <img src={course.image} alt={course.name} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold text-xs">{course.batch}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold text-xs">{course.fee}৳</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-semibold text-xs">{course.feeStatus}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.name}</h2>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 whitespace-pre-line">{course.features}</div>
                <div className="mt-auto flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.status === 'Enroll Now' ? 'bg-blue-600 text-white' : course.status === 'Pre-book' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-white'}`}>{course.status}</span>
                  {(course.status === 'Enroll Now' || course.status === 'Pre-book') && (
                    <button
                      className="ml-2 px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
                      onClick={() => { setSelectedCourse(course); setModalOpen(true); }}
                    >
                      {course.status}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Enroll/Pre-book */}
        {modalOpen && selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 relative">
              <button className="absolute top-2 right-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded" onClick={() => setModalOpen(false)}>✕</button>
              <h2 className="text-xl font-bold mb-2">{selectedCourse.name}</h2>
              <form onSubmit={handleEnroll} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={enrollForm.name}
                  onChange={e => setEnrollForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={enrollForm.contact}
                  onChange={e => setEnrollForm(f => ({ ...f, contact: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                {success && <div className="text-green-600 mt-2">{success}</div>}
              </form>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
}
