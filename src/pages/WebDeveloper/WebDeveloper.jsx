import React, { useEffect, useState } from "react";
import portfolioImg from '../../assets/images/portfolio.png';
import { app } from "../../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const skills = [
  { name: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", items: ["React", "Next.js", "HTML", "CSS", "Tailwind", "JavaScript"] },
  { name: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", items: ["Node.js", "Express", "REST API"] },
  { name: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", items: ["MongoDB", "MySQL", "Firebase"] },
  { name: "Tools & Others", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", items: ["Git", "VS Code", "Figma", "App Script", "APIs"] },
];

const db = getFirestore(app);

function useWebProjects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function fetchProjects() {
      const snap = await getDocs(collection(db, "webProjects"));
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetchProjects();
  }, []);
  return projects;
}

const workflow = [
  { step: "Design", color: "indigo", desc: "Figma → UI/UX prototyping" },
  { step: "Build", color: "green", desc: "React / Next + Tailwind" },
  { step: "Test", color: "purple", desc: "Unit & Integration tests" },
  { step: "Deploy", color: "pink", desc: "Vercel / Netlify / Heroku" },
];

// helper to map color keyword to tailwind classes
const colorMap = {
  indigo: { bg: "bg-indigo-100", dot: "bg-indigo-500", text: "text-indigo-700", darkBg: "dark:bg-indigo-900", darkText: "dark:text-indigo-200" },
  green: { bg: "bg-green-100", dot: "bg-green-500", text: "text-green-700", darkBg: "dark:bg-green-900", darkText: "dark:text-green-200" },
  purple: { bg: "bg-purple-100", dot: "bg-purple-500", text: "text-purple-700", darkBg: "dark:bg-purple-900", darkText: "dark:text-purple-200" },
  pink: { bg: "bg-pink-100", dot: "bg-pink-500", text: "text-pink-700", darkBg: "dark:bg-pink-900", darkText: "dark:text-pink-200" },
};

export default function WebDeveloperEnhanced() {
  const projects = useWebProjects();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-[#0f172a] dark:to-[#071029] py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Abir Abdullah — MERN & Full-stack Developer</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">MERN | Next.js | Node.js | Express | MongoDB | App Script | APIs | Figma</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 text-sm font-medium">MERN</a>
              <a className="px-3 py-1 rounded-full bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200 text-sm font-medium">Next.js</a>
              <a className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-200 text-sm font-medium">App Script</a>
              <a className="px-3 py-1 rounded-full bg-pink-50 text-pink-700 dark:bg-pink-900 dark:text-pink-200 text-sm font-medium">Figma</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:scale-105 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-semibold">Hire / Contact</span>
            </a>
            <a href="#" className="px-4 py-3 border rounded-lg text-sm text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700">Resume</a>
          </div>
        </header>

        {/* Skills grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">{skill.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Experienced with</div>
                </div>
              </div>

              <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1 ml-1">
                {skill.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full inline-block" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto text-xs text-gray-400">Available for freelancing & collaborations</div>
            </div>
          ))}
        </section>

        {/* Projects from admin panel */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Web Development Projects</h2>
            <div className="text-sm text-gray-500">Admin added projects — MERN / Next / APIs</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-400">No projects found.</div>
            ) : (
              projects.map((p) => (
                <article key={p.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transform transition flex flex-col">
                  <div className="relative">
                    {p.image && <img src={p.image} alt={p.name} className="w-full h-56 object-cover" />}
                    <div className="absolute left-4 bottom-4 bg-black/40 text-white px-3 py-1 rounded-md text-sm">{p.tags?.join(" • ")}</div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{p.name}</h3>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {p.tags?.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-2 flex gap-3">
                      {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="text-sm px-3 py-2 bg-gray-900 text-white rounded-md hover:opacity-90">GitHub</a>}
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="text-sm px-3 py-2 bg-blue-600 text-white rounded-md hover:opacity-90">Live Demo</a>}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Workflow */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Workflow</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {workflow.map((w, i) => {
              const c = colorMap[w.color] || colorMap.indigo;
              return (
                <div key={w.step} className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-full shadow ${c.bg} ${c.darkBg}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${c.dot} text-white font-bold`}>{w.step[0]}</div>
                    </div>
                    <div>
                      <div className={`font-semibold ${c.text} ${c.darkText}`}>{w.step}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">{w.desc}</div>
                    </div>
                  </div>
                  {i < workflow.length - 1 && <div className="hidden md:block w-12 h-0.5 bg-gray-200 dark:bg-gray-700 mx-4" />}
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer / CTA */}
        <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
          <div>Design & code — you can export UI from Figma and I can implement it in Next.js + Tailwind.</div>
          <div className="mt-2">Stack: <strong>MERN</strong> • App Script • REST & GraphQL APIs • CI/CD</div>
        </footer>
      </div>
    </div>
  );
}
