import React from "react";

const subjects = [
  'HSC Chemistry',
  'Physics',
  'Math',
  'ICT',
  'Programming Basics',
];

const teachingStyles = [
  {
    title: 'Interactive Learning',
    points: ['Live problem solving', 'Student Q&A', 'Hands-on demos'],
  },
  {
    title: 'Conceptual Focus',
    points: ['Clear explanations', 'Real-world examples', 'Step-by-step breakdowns'],
  },
  {
    title: 'Personalized Support',
    points: ['Individual feedback', 'Progress tracking', 'Motivation & guidance'],
  },
];

const platforms = [
  {
    name: 'Chemistry Course Website',
    link: 'https://chemistrycourse.com',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
    ),
  },
  {
    name: 'Medium Articles',
    link: 'https://medium.com/@yourprofile',
    icon: (
      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#02b875"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff">M</text></svg>
    ),
  },
  {
    name: 'YouTube Tutorials',
    link: 'https://youtube.com/yourchannel',
    icon: (
      <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#ff0000"/><polygon points="13,11 23,16 13,21" fill="#fff"/></svg>
    ),
  },
  {
    name: 'Biopark',
    link: 'https://biopark.com',
    icon: (
      <svg className="h-6 w-6 text-teal-600" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
    ),
  },
  {
    name: 'Radiance',
    link: 'https://radiance.com',
    icon: (
      <svg className="h-6 w-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><polygon points="12,2 15,11 24,12 15,13 12,22 9,13 0,12 9,11"/></svg>
    ),
  },
  {
    name: 'Phoenix',
    link: 'https://phoenix.com',
    icon: (
      <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2 L15 8 L22 9 L16 14 L18 22 L12 18 L6 22 L8 14 L2 9 L9 8 Z"/></svg>
    ),
  },
];

export default function Educator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Abir Abdullah — Educator & Mentor
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
            Teaching Chemistry, Physics, Math & Programming with Interactive Learning
          </p>
        </header>

        {/* Subjects */}
        <section>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6 text-center">Subjects I Teach</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {subjects.map(subj => (
              <span key={subj} className="px-5 py-3 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-sm font-semibold shadow hover:scale-105 transition-transform">
                {subj}
              </span>
            ))}
          </div>
        </section>

        {/* Teaching Style */}
        <section>
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">Teaching Style</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teachingStyles.map(style => (
              <div key={style.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:scale-105 transition-transform">
                <div className="font-semibold text-lg text-green-700 dark:text-green-400 mb-2">{style.title}</div>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 text-sm space-y-1">
                  {style.points.map((pt, i) => <li key={i}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Platforms */}
        <section>
          <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-6 text-center">Platforms</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {platforms.map(platform => (
              <a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform hover:bg-purple-50 dark:hover:bg-purple-900"
              >
                {platform.icon}
                <span className="font-medium text-purple-700 dark:text-purple-300">{platform.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Student Achievements */}
        <section>
          <h2 className="text-3xl font-bold text-yellow-700 dark:text-yellow-400 mb-6 text-center">Student Achievements</h2>
          <div className="bg-yellow-50 dark:bg-yellow-900 rounded-xl shadow-lg p-6 text-gray-700 dark:text-gray-200 text-center text-lg italic">
            Coming soon: Success stories and results from my students!
          </div>
        </section>
      </div>
    </div>
  );
}
