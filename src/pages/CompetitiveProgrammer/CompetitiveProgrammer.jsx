  // Codeforces rating hooks
// ...existing code...
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { app } from "../../firebase";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(app);
export default function CompetitivePortfolio() {
  const CF_HANDLE = "abirabdullah"; // your Codeforces handle
  const GITHUB_USER = "abirabdullahs"; // fixed username
  const GITHUB_REPO = "CF-solutions"; // fixed repo name
  const BRANCH = "main";
  const CODECHEF_HANDLE = "abirabdullah";
  const LEETCODE_HANDLE = "abirabdullah";

  const [cfRating, setCfRating] = useState(null);
  const [cfMaxRating, setCfMaxRating] = useState(null);

  // Fetch Codeforces rating and max rating
  useEffect(() => {
    async function fetchCFInfo() {
      try {
        const res = await fetch(`https://corsproxy.io/?https://codeforces.com/api/user.info?handles=${CF_HANDLE}`);
        const data = await res.json();
        if (data.status === "OK" && data.result && data.result.length > 0) {
          setCfRating(data.result[0].rating);
          setCfMaxRating(data.result[0].maxRating);
        }
      } catch {
        // ignore errors
      }
    }
    fetchCFInfo();
  }, [CF_HANDLE]);

  const [languages] = useState([
    { name: "C", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png", level: 80 },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", level: 45 },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: 25 },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 75 },
  ]);

  // Real-time solved count from Firebase for CodeChef & LeetCode
  const [codechefSolved, setCodechefSolved] = useState(0);
  const [leetcodeSolved, setLeetcodeSolved] = useState(0);
  useEffect(() => {
    async function fetchSolvedCounts() {
      try {
        const querySnapshot = await getDocs(collection(db, "competitiveProblems"));
        const allProblems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCodechefSolved(allProblems.filter(p => p.platform === "CodeChef").length);
        setLeetcodeSolved(allProblems.filter(p => p.platform === "LeetCode").length);
      } catch {}
    }
    fetchSolvedCounts();
    const interval = setInterval(fetchSolvedCounts, 10000); // update every 10s
    return () => clearInterval(interval);
  }, [db]);

  const judges = [
    {
      name: "Codeforces",
      logo: "https://sta.codeforces.com/s/84849/images/codeforces-logo-with-telegram.png",
      link: `https://codeforces.com/profile/${CF_HANDLE}`,
      solved: null,
      rating: cfRating,
    },
    {
      name: "CodeChef",
      logo: "https://assets.codechef.com/sites/all/themes/abessive/logo.png",
      link: `https://www.codechef.com/users/${CODECHEF_HANDLE}`,
      solved: codechefSolved,
      showPlus: false,
    },
    {
      name: "LeetCode",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
      link: `https://leetcode.com/${LEETCODE_HANDLE}`,
      solved: leetcodeSolved,
      showPlus: false,
    },
  ];

  const [solvedCount, setSolvedCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [problems, setProblems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [codeText, setCodeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("Codeforces");
  const [firebaseProblems, setFirebaseProblems] = useState([]);

  // Fetch CF submissions
  useEffect(() => {
    if (platformFilter !== "Codeforces") return;
    let mounted = true;
    async function fetchCF() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://codeforces.com/api/user.status?handle=${CF_HANDLE}`);
        const data = await res.json();
        if (data.status !== "OK") throw new Error("CF API error");

        const accepted = data.result.filter((s) => s.verdict === "OK");
        const unique = {};
        accepted.forEach((s) => {
          const key = `${s.problem.contestId}${s.problem.index}`;
          if (!unique[key]) {
            unique[key] = {
              key,
              name: s.problem.name,
              contestId: s.problem.contestId,
              index: s.problem.index,
              language: s.programmingLanguage,
              tags: s.problem.tags || [],
              solutionUrl: `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}/${s.problem.contestId}${s.problem.index}.cpp`,
            };
          }
        });

        const list = Object.values(unique).sort((a, b) => (a.key > b.key ? 1 : -1));
        if (mounted) {
          setProblems(list);
          setSolvedCount(list.length);
        }
      } catch {
        if (mounted) setError("Failed to load Codeforces data");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchCF();
    const interval = setInterval(fetchCF, 1000 * 60 * 3);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [platformFilter, CF_HANDLE, GITHUB_USER, GITHUB_REPO, BRANCH]);

  // Fetch Firebase problems for CodeChef/LeetCode
  useEffect(() => {
    if (platformFilter === "Codeforces") return;
    let mounted = true;
    async function fetchProblems() {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "competitiveProblems"));
        const allProblems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const filtered = allProblems.filter(p => p.platform === platformFilter);
        if (mounted) {
          setFirebaseProblems(filtered);
        }
      } catch {
        if (mounted) setError("Failed to load problems from Firebase");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProblems();
    return () => { mounted = false; };
  }, [platformFilter, db]);

  // Animate solved counter
  useEffect(() => {
    if (solvedCount === 0) return;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= solvedCount) {
        setAnimatedCount(solvedCount);
        clearInterval(interval);
      } else {
        setAnimatedCount(current);
      }
    }, 20); // speed of animation
    return () => clearInterval(interval);
  }, [solvedCount]);

  // Fetch solution code (.cpp or .py from GitHub)
  useEffect(() => {
    let mounted = true;
    if (!selected) return;
    setCodeText("");
    if (platformFilter !== "Codeforces") return;

    async function fetchCode() {
      const baseUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}/${selected.contestId}${selected.index}`;
      let txt = "";
      let lang = "C++";
      try {
        let res = await fetch(`${baseUrl}.cpp`);
        if (res.ok) {
          txt = await res.text();
          lang = "C++";
        } else {
          res = await fetch(`${baseUrl}.py`);
          if (res.ok) {
            txt = await res.text();
            lang = "Python";
          } else {
            txt = "// Solution not found in GitHub: " + baseUrl;
            lang = "";
          }
        }
        if (mounted) {
          setCodeText(txt);
          // Optionally, set language for SyntaxHighlighter if you want
          // setCodeLang(lang);
        }
      } catch (e) {
        if (mounted) setCodeText("// Solution not found in GitHub: " + baseUrl);
      }
    }
    fetchCode();
    return () => (mounted = false);
  }, [selected, platformFilter, GITHUB_USER, GITHUB_REPO, BRANCH]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Abir Abdullah — Competitive Programmer
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex flex-wrap gap-4 items-center">
              <span>
                Handle: <a href={`https://codeforces.com/profile/${CF_HANDLE}`} className="text-blue-600 hover:underline">{CF_HANDLE}</a>
              </span>
             
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {judges.map((j) => (
              <a
                key={j.name}
                href={j.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex items-center gap-4 min-w-[220px] hover:scale-105 transition"
              >
                <img src={j.logo} alt={j.name} className="w-10 h-10 object-contain" />
                <div className="flex flex-col">
                  <div className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{j.name}</div>
                  <div className="text-xs text-gray-500">View Profile</div>
                  <div className="mt-1 font-bold text-xl flex flex-col gap-1">
                    {j.name === "Codeforces" ? (
                      <>
                        <div className="flex gap-2 flex-wrap">
                          {cfRating !== null && (
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">Rating: {cfRating}</span>
                          )}
                          {cfMaxRating !== null && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Max Rating: {cfMaxRating}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">{animatedCount} solved</span>
                      </>
                    ) : (
                      <>
                        <span>{j.solved}</span>
                        <span className="text-xs text-gray-500 ml-1">solved</span>
                      </>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </header>

        

        {/* Languages Section */}
        <section className="mt-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow mb-10">
          <h2 className="text-xl font-bold mb-4">Languages & Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {languages.map((lang) => (
              <div key={lang.name} className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 rounded-xl p-4 shadow">
                <img src={lang.logo} alt={lang.name} className="w-12 h-12 mb-2" />
                <div className="font-semibold text-gray-800 dark:text-gray-200">{lang.name}</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${lang.level}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1">{lang.level}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          {['Codeforces', 'LeetCode', 'CodeChef'].map(platform => (
            <button
              key={platform}
              className={`px-4 py-2 rounded-full font-semibold border transition ${platformFilter === platform ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}`}
              onClick={() => setPlatformFilter(platform)}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Problems Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h2 className="text-xl font-bold">Solved Problems</h2>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or code (e.g. 162A)"
              className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              style={{ minWidth: 220 }}
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformFilter === "Codeforces"
              ? problems
                  .filter(p => {
                    const q = search.trim().toLowerCase();
                    if (!q) return true;
                    return (
                      p.name.toLowerCase().includes(q) ||
                      `${p.contestId}${p.index}`.toLowerCase().includes(q)
                    );
                  })
                  .map((p) => (
                    <div
                      key={p.key}
                      onClick={() => setSelected(p)}
                      className="cursor-pointer bg-gray-50 dark:bg-gray-900 border hover:border-blue-400 rounded-lg p-4 shadow-sm transition"
                    >
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{p.name}</div>
                      <div className="text-xs text-gray-500">
                        {p.contestId}{p.index} • {p.language}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {p.tags.map((tag, i) => (
                          <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
              : firebaseProblems
                  .filter(p => {
                    const q = search.trim().toLowerCase();
                    if (!q) return true;
                    return (
                      p.name.toLowerCase().includes(q) ||
                      (p.code && p.code.toLowerCase().includes(q))
                    );
                  })
                  .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelected(p)}
                      className="cursor-pointer bg-gray-50 dark:bg-gray-900 border hover:border-blue-400 rounded-lg p-4 shadow-sm transition"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${p.platform === 'CodeChef' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'}`}>{p.platform}</span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{p.status}</span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">Rating: {p.rating}</span>
                      </div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{p.name}</div>
                    </div>
                  ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <div>
                <div className="font-bold text-lg text-gray-900 dark:text-gray-100">{selected.name}</div>
                {platformFilter === "Codeforces" ? (
                  <div className="text-xs text-gray-500">
                    {selected.contestId}{selected.index} • {selected.language}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">
                    {selected.platform} • {selected.status} • Rating: {selected.rating}
                  </div>
                )}
              </div>
              <button onClick={() => setSelected(null)} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                Close
              </button>
            </div>
            <div className="p-4 max-h-[60vh] overflow-auto bg-gray-900">
              {platformFilter === "Codeforces" ? (
                codeText ? (
                  <SyntaxHighlighter language="cpp" style={vscDarkPlus} customStyle={{fontSize: '0.95em', borderRadius: '0.5em', background: 'none', margin: 0}}>
                    {codeText}
                  </SyntaxHighlighter>
                ) : (
                  "Loading..."
                )
              ) : (
                <SyntaxHighlighter language="cpp" style={vscDarkPlus} customStyle={{fontSize: '0.95em', borderRadius: '0.5em', background: 'none', margin: 0}}>
                  {selected.code}
                </SyntaxHighlighter>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
