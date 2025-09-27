
const certificates = [
  { title: 'ICPC Regional Certificate', img: '/src/assets/images/icpc-cert.png' },
  { title: 'LeetCode 100 Days', img: '/src/assets/images/leetcode-cert.png' },
  { title: 'Web Dev Bootcamp', img: '/src/assets/images/webdev-cert.png' },
];

const contests = [
  { year: '2024', event: 'ICPC Regional Finalist', details: 'Qualified for ICPC regionals, top 50 team.' },
  { year: '2023', event: 'NCPC Silver Medalist', details: 'Won Silver Medal in National Collegiate Programming Contest.' },
  { year: '2022', event: 'Codeforces Expert', details: 'Achieved Expert rating on Codeforces.' },
];

const awards = [
  'Best Student Award, XYZ University',
  'Top 100 in National Programming Contest',
  'Multiple contest ranks and recognitions',
];

export default function Achievements() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Certificates */}
        <div>
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6">Certificates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {certificates.map(cert => (
              <div key={cert.title} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center gap-3">
                <img src={cert.img} alt={cert.title} className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700 mb-2" />
                <div className="font-semibold text-blue-700 dark:text-blue-400 text-center">{cert.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Programming Contest Achievements */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6">Programming Contest Achievements</h2>
          <div className="flex flex-col gap-4">
            {contests.map((c, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-20 text-center font-bold text-green-700 dark:text-green-400">{c.year}</div>
                <div className="flex-1 bg-green-50 dark:bg-green-900 rounded-lg p-4 shadow">
                  <div className="font-semibold text-green-800 dark:text-green-200">{c.event}</div>
                  <div className="text-gray-700 dark:text-gray-200 text-sm">{c.details}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognitions */}
        <div>
          <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">Awards & Recognitions</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
            {awards.map((award, i) => (
              <li key={i}>{award}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
