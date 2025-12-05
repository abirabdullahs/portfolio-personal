import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../firebase';
import SEO from '../../components/SEO';

const db = getFirestore(app);

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true);
      const ref = doc(db, 'courses', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setCourse({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    }
    fetchCourse();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <SEO
        title={`${course.name} — Abir Hossen Abdullah`}
        description={`Details and enrollment for ${course.name} by Abir Hossen Abdullah.`}
        url={`https://abirabdullah.web.app/courses/${course.id}`}
      />
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <img src={course.image} alt={course.name} className="w-full h-45 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.name}</h2>
                <div className="mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold text-sm mr-2">{course.batch}</span>
                </div>
                <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line mb-4">{course.features}</div>
                <div className="mb-2 text-green-700 font-bold text-xl">{course.fee}৳ <span className="text-gray-700 text-base font-normal">({course.feeStatus})</span></div>
                <div className="mt-auto flex flex-col items-start">
                  {(course.status === 'Enroll Now' || course.status === 'Pre-book') ? (
                    <span className={`mb-2 px-4 py-2 bg-blue-600 text-white rounded font-semibold text-lg`}>{course.status}</span>
                  ) : (
                    <span className={`px-3 py-1 rounded text-xs font-bold bg-gray-400 text-white`}>{course.status}</span>
                  )}
                </div>
              </div>
        <div className="text-center mt-4">
          <a href="/courses" className="text-blue-600 hover:underline">← Back to all courses</a>
        </div>
      </div>
    </div>
  );
}
