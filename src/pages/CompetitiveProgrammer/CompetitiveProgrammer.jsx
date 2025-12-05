// CompetitivePortfolio.jsx
import React, { useEffect, useState } from "react";
import SEO from "../../components/SEO";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { app } from "../../firebase";
import { getFirestore } from "firebase/firestore";
import { fetchGithubFilesRecursive } from "../../utils/github";

const db = getFirestore(app);

export default function CompetitivePortfolio() {
  const CF_HANDLE = "abirabdullah";
  const GITHUB_USER = "abirabdullahs";
  const CF_REPO = "CF-solutions";
  const CC_REPO = "CC-solutions";
  const LC_REPO = "LC-solutions";
  const BRANCH = "main";

  const [cfRating, setCfRating] = useState(null);
  const [cfMaxRating, setCfMaxRating] = useState(null);
  const [cfSolved, setCfSolved] = useState(0);

  // Fetch Codeforces rating
  useEffect(() => {
    async function fetchCFInfo() {
      try {
        const res = await fetch(
          `https://corsproxy.io/?https://codeforces.com/api/user.info?handles=${CF_HANDLE}`
        );
        const data = await res.json();
        if (data.status === "OK" && data.result?.length > 0) {
          setCfRating(data.result[0].rating);
          setCfMaxRating(data.result[0].maxRating);
        }
      } catch {}
    }
    fetchCFInfo();
  }, []);

  // Fetch total solved problems for Codeforces
  useEffect(() => {
    async function fetchSolved() {
      try {
        const res = await fetch(
          `https://codeforces.com/api/user.status?handle=${CF_HANDLE}`
        );
        const data = await res.json();
        if (data.status === "OK") {
          const accepted = data.result.filter((s) => s.verdict === "OK");
          const unique = new Set();
          accepted.forEach((s) => unique.add(`${s.problem.contestId}${s.problem.index}`));
          setCfSolved(unique.size);
        }
      } catch {}
    }
    fetchSolved();
  }, []);

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
      link: `https://www.codechef.com/users/${CF_HANDLE}`,
    },
    {
      name: "LeetCode",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
      link: `https://leetcode.com/${CF_HANDLE}`,
    },
  ];

  const [platformFilter, setPlatformFilter] = useState("Codeforces");
  const [problems, setProblems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [codeText, setCodeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch problems depending on platform
  useEffect(() => {
    let mounted = true;
    async function fetchProblems() {
      setLoading(true);
      try {
        if (platformFilter === "Codeforces") {
          // Fetch solved from CF API
          const res = await fetch(
            `https://codeforces.com/api/user.status?handle=${CF_HANDLE}`
          );
          const data = await res.json();
          if (data.status !== "OK") throw new Error("CF API error");

          // Fetch all files from GitHub repo recursively
          const files = await fetchGithubFilesRecursive(GITHUB_USER, CF_REPO, BRANCH, "");
          // Supported extensions
          const exts = ["cpp", "py", "java", "js"];

          const accepted = data.result.filter((s) => s.verdict === "OK");
          const unique = {};
          accepted.forEach((s) => {
            const key = `${s.problem.contestId}${s.problem.index}`;
            if (!unique[key]) {
              // Try to find file in files list
              let fileObj = null;
              for (const ext of exts) {
                fileObj = files.find(f => f.name === `${key}.${ext}`);
                if (fileObj) break;
              }
              unique[key] = {
                key,
                name: s.problem.name,
                contestId: s.problem.contestId,
                index: s.problem.index,
                language: s.programmingLanguage,
                tags: s.problem.tags || [],
                url: fileObj ? fileObj.download_url : null,
                ext: fileObj ? fileObj.name.split('.').pop() : null,
              };
            }
          });
          if (mounted) setProblems(Object.values(unique));
        } else {
          // Fetch from GitHub repo (CodeChef / LeetCode) recursively
          const repo =
            platformFilter === "CodeChef" ? CC_REPO : LC_REPO;
          const files = await fetchGithubFilesRecursive(GITHUB_USER, repo, BRANCH, "");
          const exts = ["cpp", "py", "java", "js"]; // Supported extensions
          const list = files
            .filter((f) => exts.some(ext => f.name.endsWith(`.${ext}`)))
            .map((f) => ({
              key: f.name,
              name: f.name.replace(/\.(cpp|py|java|js)$/, ""),
              url: f.download_url,
              ext: f.name.split('.').pop(),
            }));
          if (mounted) setProblems(list);
        }
      } catch (e) {
        if (mounted) setProblems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProblems();
    return () => {
      mounted = false;
    };
  }, [platformFilter]);

  // Fetch code when problem selected
  useEffect(() => {
    let mounted = true;
    async function fetchCode() {
      if (!selected) return;
      setCodeText("");
      try {
        const res = await fetch(selected.url);
        const txt = await res.text();
        if (mounted) setCodeText(txt);
      } catch {
        if (mounted) setCodeText("// Failed to load code");
      }
    }
    fetchCode();
    return () => {
      mounted = false;
    };
  }, [selected]);

  // Counter animation hook
  function useCounter(target, duration = 1200) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      if (!target) return setCount(0);
      const increment = Math.ceil(target / (duration / 16));
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }, [target, duration]);
    return count;
  }

  // Counter animation component
  function Counter({ value }) {
    const count = useCounter(value);
    return <span>{count}</span>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      <SEO title="Competitive Programmer — Abir Hossen Abdullah" description="Competitive programming achievements, Codeforces, CodeChef, LeetCode solutions and contest history." url="https://abirabdullah.web.app/competitive-programmer" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Abir Abdullah — Competitive Programmer
            </h1>
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
                <img
                  src={j.name === "Codeforces" ? "https://sta.codeforces.com/s/84849/images/codeforces-logo-with-telegram.png" : j.logo}
                  alt={j.name}
                  className="w-10 h-10 object-contain"
                />
                <div className="flex flex-col">
                  <div className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                    {j.name}
                  </div>
                  {j.name === "Codeforces" && (
                    <div className="mt-1">
                      <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                        Handle: <span className="font-bold">{CF_HANDLE}</span>
                      </div>
                      <div className="flex gap-2 flex-wrap mt-1">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                          Rating: {cfRating ?? "-"}
                        </span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                          Max: {cfMaxRating ?? "-"}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                          Solved: <Counter value={cfSolved} />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </header>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          {["Codeforces", "CodeChef", "LeetCode"].map((platform) => (
            <button
              key={platform}
              className={`px-4 py-2 rounded-full font-semibold border transition ${
                platformFilter === platform
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
              }`}
              onClick={() => setPlatformFilter(platform)}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Problems */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h2 className="text-xl font-bold">Solved Problems</h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              style={{ minWidth: 220 }}
            />
          </div>
          {loading && <div className="text-gray-500">Loading...</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems
              .filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((p) => (
                <div
                  key={p.key}
                  onClick={() => p.url && setSelected(p)}
                  className={`cursor-pointer bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 shadow-sm transition ${p.url ? "hover:border-blue-400" : "opacity-50 cursor-not-allowed"}`}
                >
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {p.name}
                  </div>
                  {p.language && (
                    <div className="text-xs text-gray-500">{p.language}</div>
                  )}
                  {!p.url && (
                    <div className="text-xs text-red-500 mt-2">No solution found</div>
                  )}
                </div>
              ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelected(null)}
          />
          <div className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {selected.name}
              </div>
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded"
              >
                Close
              </button>
            </div>
            <div className="p-4 max-h-[70vh] overflow-auto bg-gray-900">
              <SyntaxHighlighter
                language={selected.ext || "cpp"}
                style={vscDarkPlus}
                customStyle={{
                  fontSize: "0.95em",
                  borderRadius: "0.5em",
                  background: "none",
                  margin: 0,
                }}
              >
                {codeText || "// Loading..."}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
