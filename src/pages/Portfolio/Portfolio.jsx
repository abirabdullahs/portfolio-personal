
import { useState } from 'react';
import portfolioImg from '../../assets/images/portfolio.png';
import blogImg from '../../assets/images/blog.png';
import icpcImg from '../../assets/images/icpc.png';
import codeforcesImg from '../../assets/images/codeforces.png';
import mediumImg from '../../assets/images/medium.png';
import quizImg from '../../assets/images/quiz.png';
import gameImg from '../../assets/images/2048.png';

const categories = [
  { key: 'web', label: 'Web Projects' },
  { key: 'prog', label: 'Programming Achievements' },
  { key: 'articles', label: 'Articles' },
  { key: 'tools', label: 'Educational Tools' },
  { key: 'games', label: 'Games' },
];

const items = {
  web: [
    {
      title: 'Portfolio Website',
      desc: 'Personal portfolio built with React and Tailwind CSS.',
  img: portfolioImg,
      github: 'https://github.com/yourprofile/portfolio',
      live: 'https://abirabdullah.netlify.app',
    },
    {
      title: 'Blog Platform',
      desc: 'A full-stack blog platform with authentication and CRUD.',
  img: blogImg,
      github: 'https://github.com/yourprofile/blog-platform',
      live: 'https://yourblog.com',
    },
  ],
  prog: [
    {
      title: 'ICPC Regional Finalist',
      desc: 'Qualified for ICPC regionals with top contest ranks.',
  img: icpcImg,
      github: '',
      live: '',
    },
    {
      title: 'Codeforces Expert',
      desc: 'Achieved Expert rating on Codeforces.',
  img: codeforcesImg,
      github: 'https://codeforces.com/profile/yourprofile',
      live: '',
    },
  ],
  articles: [
    {
      title: 'Medium Article: React Tips',
      desc: 'Published React best practices on Medium.',
  img: mediumImg,
      github: '',
      live: 'https://medium.com/@yourprofile/react-tips',
    },
  ],
  tools: [
    {
      title: 'Chemistry Quiz App',
      desc: 'Interactive quiz app for HSC Chemistry students.',
  img: quizImg,
      github: 'https://github.com/yourprofile/chemistry-quiz',
      live: 'https://chemistryquiz.com',
    },
  ],
  games: [
    {
      title: '2048 Game',
      desc: 'Classic 2048 game built with React.',
  img: gameImg,
      github: 'https://github.com/yourprofile/2048-react',
      live: 'https://your2048game.com',
    },
  ],
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('web');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow text-sm focus:outline-none ${activeTab === cat.key ? 'bg-blue-600 text-white scale-105' : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
          {items[activeTab].map((item, i) => (
            <div key={i} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-4 animate-fade-in">
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-2 border border-gray-200 dark:border-gray-700" />
              <div className="font-bold text-lg text-blue-700 dark:text-blue-400">{item.title}</div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">{item.desc}</div>
              <div className="flex gap-3">
                {item.github && <a href={item.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-700 transition text-sm font-semibold">GitHub</a>}
                {item.live && <a href={item.live} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm font-semibold">Live Demo</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Animation keyframes */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
