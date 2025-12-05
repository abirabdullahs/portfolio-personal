import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { app } from "../../firebase";
import SEO from "../../components/SEO";
import Educator from "../Educator/Educator";

const db = getFirestore(app);

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "courses"), (querySnapshot) => {
      setCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4" style={{ fontFamily: 'Hind Siliguri, Quicksand, Poppins, sans-serif' }}>
      <SEO title="Courses — Abir Hossen Abdullah" description="Explore courses by Abir Hossen Abdullah. Enroll in programming, science, and technology courses." url="https://abirabdullah.web.app/courses" />
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <a
              key={course.id}
              href={`/courses/${course.id}`}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer hover:scale-[1.02] transition"
            >
              <img src={course.image} alt={course.name} className="w-full h-45 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.name}</h2>
                <div className="mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold text-sm mr-2">{course.batch}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 whitespace-pre-line line-clamp-3 max-h-14 overflow-hidden">{course.features}</div>
                <div className="mb-2 text-green-700 font-bold text-xl">{course.fee}৳ <span className="text-gray-700 text-base font-normal">({course.feeStatus})</span></div>
                <div className="mt-auto flex flex-col items-start">
                  {(course.status === 'Enroll Now' || course.status === 'Pre-book') ? (
                    <span className={`mb-2 px-4 py-2 bg-blue-600 text-white rounded font-semibold text-lg`}>{course.status}</span>
                  ) : (
                    <span className={`px-3 py-1 rounded text-xs font-bold bg-gray-400 text-white`}>{course.status}</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ...existing code... */}
      </div>
    </div>
  );
}
